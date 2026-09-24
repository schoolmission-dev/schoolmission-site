@AGENTS.md

# Traps

## The shell collapses doubled backslashes

Anything sent through the Bash tool has every `\\` reduced to `\` before it is
parsed — the whole command string, not just its unquoted parts. A quoted
heredoc (`<<'JS'`) does **not** protect it: the file lands on disk already
collapsed. Single backslashes are untouched, so a regex *literal* like `/\s/`
survives; it is only sequences that need a literal backslash in the resulting
string that break.

```
node -e 'console.log("\\b".length, "\\b".charCodeAt(0))'   ->  1 8    (a backspace)
# the same two characters in an editor-written file        ->  2 92   (a backslash)
```

So `new RegExp("\\b" + word + "\\b")` built in an inline script compiles to
`/word/` wrapped in two stray backspace characters, and **matches nothing**.
That is the dangerous part: it does not throw. A scanner written this way
reports a clean result on text that plainly contains what it was looking for,
and the false negative is indistinguishable from a pass. It has already
happened here once — a British-spelling scan returned "none found" on a file
holding seven `organisations`.

**Rules:**

- Do not rely on escape sequences inside inline `node -e`, `python -c`, or a
  heredoc'd script body. Assume every `\\` arrives as `\` and every `\uXXXX`
  written as `\\uXXXX` arrives mangled.
- Put any scanner, verifier, or non-trivial script in a file **written through
  the Write/Edit tools**, then run it with `node path/to/script.js`. Those go
  straight to disk and preserve backslashes exactly.
- In a pattern, prefer character-class boundaries to `\b`:
  `'(^|[^A-Za-z])' + word + '([^A-Za-z]|$)'`. They need no escapes at all.
- A check that can only fail silently is not a check. Give a scanner a case you
  know it should catch and confirm it catches it before trusting a clean run.

Files written through the editor are unaffected — the `'\\u003c'` escape in
`components/site/JsonLd.tsx` is intact on disk. The trap is specific to scripts
sent through the shell.

## `pkill` is not available, so the old dev server keeps serving

There is no `pkill` binary on this machine. What exists is a shell *function*
wrapper, so `command -v pkill` answers and the failure only shows on use:

```
pkill -f "next start"   ->  line 42: pkill: command not found   (exit 127)
```

Written the usual way — `pkill -f "next start" 2>/dev/null; npx next start ...`
— the error is swallowed by the redirect and the `;` carries on regardless. The
old server is still holding the port, so the new one dies with
`EADDRINUSE: address already in use`, which lands in the log file rather than
the terminal. `curl` then answers **200 from the old process**.

The result is a verification run against the previous build: a change looks
like it did not land, or an old page looks like it still works. It has happened
here more than once, including reading a 404 for a route that had just been
built, and reading old `og:` tags after they were fixed.

Kill by port instead, through the PowerShell tool:

```powershell
Get-NetTCPConnection -LocalPort 3100 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```

`taskkill` also exists on PATH from bash if you prefer. Afterwards, confirm the
port is actually dead — `curl` returns code `000` (connection refused), not
`200` — and after restarting, test a route or a string that exists only in the
new build. Do not gate on grepping the start log for `EADDRINUSE`: the log is
written a moment after the port starts answering, so that check races.
