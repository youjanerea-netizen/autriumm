const SQL=(()=>{                                       

                        
               
                    
                     
  

                          
           
                            
                    
                     
                  
                          
                     
  

                                                      

                                                

const AMBIG = Symbol("ambig");

                                    

              
                                   
                           
  

function cloneTables(tables            )             {
  return tables.map((table) => ({
    name: table.name,
    columns: [...table.columns],
    rows: table.rows.map((row) => [...row]),
  }));
}

function stripComments(sql        ) {
  return sql.replace(/--[^\n]*/g, " ");
}

function shield(sql        ) {
  const strings           = [];
  const text = sql.replace(/'(?:''|[^'])*'|"(?:\\"|[^"])*"/g, (match) => {
    const quote = match[0];
    const inner = match.slice(1, -1).replace(quote === "'" ? /''/g : /""/g, quote);
    strings.push(inner);
    return `§${strings.length - 1}§`;
  });
  return { text, strings };
}

function normalize(source        )                                                   {
  let raw = stripComments(source).trim();
  if (!raw) return { ok: false, error: "Écris une requête." };
  raw = raw.replace(/;+\s*$/, "").trim();
  if (raw.includes(";")) {
    return { ok: false, error: "Une seule requête à la fois." };
  }
  const { text, strings } = shield(raw);
  const flat = text.replace(/\s+/g, " ").trim().toLowerCase();
  return { text: flat, strings };
}

function findTable(tables            , name        ) {
  return tables.find((table) => table.name.toLowerCase() === name);
}

function parseValue(token        , strings          )                  {
  const placeholder = token.match(/^§(\d+)§$/);
  if (placeholder) return strings[Number(placeholder[1])] ?? null;
  if (/^-?\d+(\.\d+)?$/.test(token)) return Number(token);
  return null;
}

function asNumber(value          )                {
  if (typeof value === "number") return value;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return null;
}

function compare(left          , op        , right          ) {
  const a = asNumber(left);
  const b = asNumber(right);
  const numeric = a !== null && b !== null;
  if (op === "=") return numeric ? a === b : String(left) === String(right);
  if (op === "!=" || op === "<>") return numeric ? a !== b : String(left) !== String(right);
  if (!numeric) {
    const ls = String(left);
    const rs = String(right);
    if (op === "<") return ls < rs;
    if (op === ">") return ls > rs;
    if (op === "<=") return ls <= rs;
    if (op === ">=") return ls >= rs;
    return false;
  }
  if (op === "<") return a < b;
  if (op === ">") return a > b;
  if (op === "<=") return a <= b;
  if (op === ">=") return a >= b;
  return false;
}

function splitComma(list        ) {
  return list
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

                                                         

function parseWhere(where        , strings          )                      {
  const parts = where.split(/\s+and\s+/);
  const preds         = [];
  for (const part of parts) {
    const match = part.trim().match(/^([a-z_][a-z0-9_.]*)\s*(<=|>=|<>|!=|=|<|>)\s*(\S+)$/);
    if (!match) {
      return {
        ok: false,
        error: `Condition trop complexe : « ${part.trim()} ». Utilise =, <, >, <=, >=, != et AND.`,
      };
    }
    const value = parseValue(match[3], strings);
    if (value === null) {
      return { ok: false, error: `Valeur illisible : « ${match[3]} ». Entoure le texte de quotes.` };
    }
    preds.push({ col: match[1], op: match[2], value });
  }
  return preds;
}

function scopeFrom(table          , row            )        {
  const qualified = new Map                  ();
  const plain = new Map              ();
  table.columns.forEach((column, index) => {
    const key = column.toLowerCase();
    qualified.set(`${table.name.toLowerCase()}.${key}`, row[index]);
    plain.set(key, row[index]);
  });
  return { qualified, plain };
}

function mergeScopes(left       , right       )        {
  const qualified = new Map(left.qualified);
  const plain = new Map(left.plain);
  right.qualified.forEach((value, key) => qualified.set(key, value));
  right.plain.forEach((value, key) => {
    if (plain.has(key)) plain.set(key, AMBIG);
    else plain.set(key, value);
  });
  return { qualified, plain };
}

function isFailure(value         )                      {
  return typeof value === "object" && value !== null && "ok" in value;
}

function readCol(scope       , col        )                        {
  if (col.includes(".")) {
    if (!scope.qualified.has(col)) return { ok: false, error: `Colonne inconnue : ${col}` };
    return scope.qualified.get(col)            ;
  }
  if (!scope.plain.has(col)) return { ok: false, error: `Colonne inconnue : ${col}` };
  const value = scope.plain.get(col);
  if (value === AMBIG) {
    return {
      ok: false,
      error: `La colonne « ${col} » existe dans plusieurs tables. Précise-la, par exemple livres.${col}.`,
    };
  }
  return value            ;
}

function matchPreds(scope       , preds        )                       {
  for (const pred of preds) {
    const left = readCol(scope, pred.col);
    if (isFailure(left)) return left;
    if (!compare(left, pred.op, pred.value)) return false;
  }
  return true;
}

function sortScopes(scopes         , order                                      )                       {
  const decorated                                           = [];
  for (const scope of scopes) {
    const value = readCol(scope, order.col);
    if (isFailure(value)) return value;
    decorated.push({ scope, value });
  }
  const dir = order.dir === "desc" ? -1 : 1;
  decorated.sort((a, b) => {
    if (a.value === b.value) return 0;
    const left = asNumber(a.value);
    const right = asNumber(b.value);
    if (left !== null && right !== null) return left < right ? -dir : dir;
    return String(a.value) < String(b.value) ? -dir : dir;
  });
  return decorated.map((item) => item.scope);
}

function project(
  scope       ,
  select        ,
  rightName               ,
  tables            ,
)                                                         {
  if (select.trim() === "*") {
    const columns           = [];
    const values             = [];
    scope.qualified.forEach((value, key) => {
      columns.push(rightName ? key : key.split(".")[1]);
      values.push(value);
    });
    return { columns, values };
  }

  const columns           = [];
  const values             = [];
  for (const item of splitComma(select)) {
    if (item.endsWith(".*")) {
      const name = item.slice(0, -2);
      const table = findTable(tables, name);
      if (!table) return { ok: false, error: `Table inconnue : ${name}` };
      for (const column of table.columns) {
        const key = column.toLowerCase();
        columns.push(rightName ? `${name}.${key}` : key);
        values.push(scope.qualified.get(`${name}.${key}`)            );
      }
      continue;
    }
    const value = readCol(scope, item);
    if (isFailure(value)) return value;
    columns.push(item);
    values.push(value);
  }
  return { columns, values };
}

function available(tables            ) {
  return tables.map((table) => table.name).join(", ");
}

function runSelect(
  body        ,
  strings          ,
  tables            ,
  order                                             ,
)            {
  const fromMatch = body.match(/^select\s+(.+)\s+from\s+(.+)$/);
  if (!fromMatch) {
    return { ok: false, error: "Requête SELECT incomplète. Exemple : SELECT titre FROM livres" };
  }
  const select = fromMatch[1];
  let from = fromMatch[2];
  let preds         = [];

  const whereMatch = from.match(/^(.*)\s+where\s+(.+)$/);
  if (whereMatch) {
    from = whereMatch[1];
    const parsed = parseWhere(whereMatch[2], strings);
    if (isFailure(parsed)) return parsed;
    preds = parsed;
  }

  const joinMatch = from.match(
    /^([a-z_][a-z0-9_]*)\s+(?:inner\s+)?join\s+([a-z_][a-z0-9_]*)\s+on\s+([a-z_][a-z0-9_.]*)\s*=\s*([a-z_][a-z0-9_.]*)$/,
  );

  let scopes          = [];
  let rightName                = null;

  if (joinMatch) {
    const leftName = joinMatch[1];
    rightName = joinMatch[2];
    const left = findTable(tables, leftName);
    const right = findTable(tables, rightName);
    if (!left || !right) {
      return { ok: false, error: `Table inconnue. Tables disponibles : ${available(tables)}.` };
    }
    for (const leftRow of left.rows) {
      for (const rightRow of right.rows) {
        const scope = mergeScopes(scopeFrom(left, leftRow), scopeFrom(right, rightRow));
        const onLeft = readCol(scope, joinMatch[3]);
        const onRight = readCol(scope, joinMatch[4]);
        if (isFailure(onLeft)) return onLeft;
        if (isFailure(onRight)) return onRight;
        if (compare(onLeft, "=", onRight)) scopes.push(scope);
      }
    }
  } else {
    if (!/^[a-z_][a-z0-9_]*$/.test(from)) {
      return {
        ok: false,
        error: "Jointure trop complexe. Utilise INNER JOIN ... ON table.col = autre.col.",
      };
    }
    const table = findTable(tables, from);
    if (!table) return { ok: false, error: `Table inconnue : ${from}. Tables : ${available(tables)}.` };
    scopes = table.rows.map((row) => scopeFrom(table, row));
  }

  const kept          = [];
  for (const scope of scopes) {
    const ok = matchPreds(scope, preds);
    if (isFailure(ok)) return ok;
    if (ok) kept.push(scope);
  }

  if (order) {
    const sorted = sortScopes(kept, order);
    if (isFailure(sorted)) return sorted;
    kept.splice(0, kept.length, ...sorted);
  }

  const projected               = [];
  let columns           = [];
  for (const scope of kept) {
    const row = project(scope, select, rightName, tables);
    if (isFailure(row)) return row;
    columns = row.columns;
    projected.push(row.values);
  }
  if (kept.length === 0 && scopes.length > 0) {
    const sample = project(scopes[0], select, rightName, tables);
    if (isFailure(sample)) return sample;
    columns = sample.columns;
  } else if (kept.length === 0 && select.trim() !== "*") {
    columns = splitComma(select);
  }

  return {
    ok: true,
    kind: "select",
    columns,
    rows: projected,
    message: projected.length === 1 ? "1 ligne." : `${projected.length} lignes.`,
    affected: null,
    tables,
  };
}

function runMutate(kind                                , sql        , strings          , tables            )            {
  if (kind === "insert") {
    const match = sql.match(/^insert into\s+([a-z_][a-z0-9_]*)\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)$/);
    if (!match) {
      return { ok: false, error: "INSERT attendu : INSERT INTO livres (titre, prix) VALUES ('Poésies', 14)" };
    }
    const table = findTable(tables, match[1]);
    if (!table) return { ok: false, error: `Table inconnue : ${match[1]}.` };
    const cols = splitComma(match[2]);
    const rawValues = splitComma(match[3]);
    if (cols.length !== rawValues.length) {
      return { ok: false, error: "Le nombre de colonnes et de valeurs ne correspond pas." };
    }
    const unknown = cols.find((col) => !table.columns.some((column) => column.toLowerCase() === col));
    if (unknown) return { ok: false, error: `Colonne inconnue : ${unknown}` };
    const row = table.columns.map(() => ""            );
    for (let index = 0; index < cols.length; index += 1) {
      const at = table.columns.findIndex((column) => column.toLowerCase() === cols[index]);
      const value = parseValue(rawValues[index], strings);
      if (value === null) return { ok: false, error: `Valeur illisible : « ${rawValues[index]} ».` };
      row[at] = value;
    }
    table.rows.push(row);
    return {
      ok: true,
      kind: "mutate",
      columns: table.columns,
      rows: table.rows,
      message: "1 ligne ajoutée.",
      affected: table.name,
      tables,
    };
  }

  if (kind === "update") {
    const match = sql.match(/^update\s+([a-z_][a-z0-9_]*)\s+set\s+(.+)$/);
    if (!match) return { ok: false, error: "UPDATE incomplet. Exemple : UPDATE livres SET prix = 12 WHERE id = 1" };
    const table = findTable(tables, match[1]);
    if (!table) return { ok: false, error: `Table inconnue : ${match[1]}.` };
    let assign = match[2];
    let preds         = [];
    const where = assign.match(/^(.*)\s+where\s+(.+)$/);
    if (where) {
      assign = where[1];
      const parsed = parseWhere(where[2], strings);
      if (isFailure(parsed)) return parsed;
      preds = parsed;
    }
    const pairs = splitComma(assign).map((part) => {
      const eq = part.match(/^([a-z_][a-z0-9_]*)\s*=\s*(\S+)$/);
      return eq ? { col: eq[1], token: eq[2] } : null;
    });
    if (pairs.some((pair) => !pair)) {
      return { ok: false, error: "Affectation illisible. Exemple : SET prix = 12, auteur = 'Bâ'" };
    }
    let count = 0;
    for (const row of table.rows) {
      const scope = scopeFrom(table, row);
      const ok = matchPreds(scope, preds);
      if (isFailure(ok)) return ok;
      if (!ok) continue;
      for (const pair of pairs) {
        if (!pair) continue;
        const at = table.columns.findIndex((column) => column.toLowerCase() === pair.col);
        if (at < 0) return { ok: false, error: `Colonne inconnue : ${pair.col}` };
        const value = parseValue(pair.token, strings);
        if (value === null) return { ok: false, error: `Valeur illisible : « ${pair.token} ».` };
        row[at] = value;
      }
      count += 1;
    }
    return {
      ok: true,
      kind: "mutate",
      columns: table.columns,
      rows: table.rows,
      message: count === 1 ? "1 ligne modifiée." : `${count} lignes modifiées.`,
      affected: table.name,
      tables,
    };
  }

  const match = sql.match(/^delete from\s+([a-z_][a-z0-9_]*)(?:\s+where\s+(.+))?$/);
  if (!match) return { ok: false, error: "DELETE incomplet. Exemple : DELETE FROM livres WHERE id = 2" };
  const table = findTable(tables, match[1]);
  if (!table) return { ok: false, error: `Table inconnue : ${match[1]}.` };
  let preds         = [];
  if (match[2]) {
    const parsed = parseWhere(match[2], strings);
    if (isFailure(parsed)) return parsed;
    preds = parsed;
  }
  const next               = [];
  let count = 0;
  for (const row of table.rows) {
    const ok = matchPreds(scopeFrom(table, row), preds);
    if (isFailure(ok)) return ok;
    if (ok) count += 1;
    else next.push(row);
  }
  table.rows = next;
  return {
    ok: true,
    kind: "mutate",
    columns: table.columns,
    rows: table.rows,
    message: count === 1 ? "1 ligne supprimée." : `${count} lignes supprimées.`,
    affected: table.name,
    tables,
  };
}

function runSql(source        , seeds            )            {
  const prepared = normalize(source);
  if (isFailure(prepared)) return prepared;
  const { text, strings } = prepared;
  const tables = cloneTables(seeds);

  let order                                              = null;
  let sql = text;
  const orderMatch = sql.match(/^(.*)\s+order by\s+([a-z_][a-z0-9_.]*)(?:\s+(asc|desc))?$/);
  if (orderMatch) {
    sql = orderMatch[1].trim();
    order = { col: orderMatch[2], dir: orderMatch[3] === "desc" ? "desc" : "asc" };
    if (!sql.startsWith("select ")) return { ok: false, error: "ORDER BY s'utilise avec SELECT." };
  }

  if (sql.startsWith("select ")) return runSelect(sql, strings, tables, order);
  if (sql.startsWith("insert ")) return runMutate("insert", sql, strings, tables);
  if (sql.startsWith("update ")) return runMutate("update", sql, strings, tables);
  if (sql.startsWith("delete ")) return runMutate("delete", sql, strings, tables);
  return { ok: false, error: "Je ne comprends pas cette requête. Utilise SELECT, INSERT, UPDATE ou DELETE." };
}

function signature(columns          , rows              , ordered         ) {
  const head = columns.map((column) => column.toLowerCase()).join("|");
  const body = rows.map((row) => row.map((value) => `${typeof value}:${String(value)}`).join("\u0001"));
  const lines = ordered ? body : [...body].sort();
  return `${head}#${lines.join("\u0002")}`;
}

function sameOutcome(user            , solution            , ordered         ) {
  if (user.kind !== solution.kind) return false;
  if (user.kind === "select") {
    return signature(user.columns, user.rows, ordered) === signature(solution.columns, solution.rows, ordered);
  }
  const userTable = user.tables.find((table) => table.name === user.affected);
  const solutionTable = solution.tables.find((table) => table.name === solution.affected);
  if (!userTable || !solutionTable) return false;
  return (
    signature(userTable.columns, userTable.rows, false) ===
    signature(solutionTable.columns, solutionTable.rows, false)
  );
}

return{runSql,sameOutcome};})();