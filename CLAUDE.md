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
