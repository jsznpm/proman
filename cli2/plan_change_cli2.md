# Locked folder — nested browsing + password gate (ubuligan)

Full design/context: see the approved plan in this session
(`bunu-oxu-polymorphic-milner.md`). This file tracks execution.

## Phase 1 — Data & config layer
- [x] github.js: listContents(path, ctx)
- [x] github.test.js: listContents tests (mixed dir/file, nested segment-encoding, 404)
- [x] config.js: LOCKED_FOLDER, isLockedFolder, hashPassword, LOCKED_PASSWORD_HASH, verifyLockedPassword
- [x] config.test.js: isLockedFolder, hashPassword vector, verifyLockedPassword negatives
- [x] npm test green

## Phase 2 — Password prompt UI
- [x] ui/password-prompt.js: PasswordPrompt component
- [x] ui.test.js: PasswordPrompt tests
- [x] npm test green

## Phase 3 — Nested browsing + app.js state machine
- [x] file-list.js → node-list.js (NodeList, path-driven, dir descend vs file preview)
- [x] app.js: pathStack, "password" screen, unlockedLocked, verifyPassword prop
- [x] ui.test.js: NodeList descend/preview test, App wrong/correct password tests, back-navigation test
- [x] README.md: Keys table update
- [x] npm test green

## Phase 4 — actions.js doc, password rotation, manual E2E
- [x] actions.js: document folder param as top-level ancestor
- [x] README.md: "Locked folder password" section
- [ ] Generate real LOCKED_PASSWORD_HASH (plaintext never committed) — needs user's chosen passphrase
- [ ] Push locked/ fixture to jsznpm/proman: locked/a.md, locked/sub/b.md, locked/sub/deeper/c.md — needs user go-ahead (public repo push)
- [ ] Manual E2E verification (automated App/NodeList/PasswordPrompt integration tests already cover the same flows headlessly)
- [x] npm test green (full suite, 40/40)

## Part A (done, tracked here for completeness)
- [x] cli/src/config.js: add "locked" to EXCLUDED_FOLDERS
- [x] cli test: assert "locked" excluded
