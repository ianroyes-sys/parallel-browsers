# parallel-browsers

A tiny Node script that opens several URLs at once, each in its own isolated Playwright browser session with a persistent profile.

Each session gets its own profile directory, so cookies, logins and local storage never leak between sessions, and they survive between runs. Useful for checking a site as several logged-in users side by side, or warming up multiple accounts in one command.

## Features

- One isolated browser context per URL, all launched concurrently
- Persistent profiles in `~/.parallel-browsers/session-N` (session 1 is always the first URL)
- Headless by default, `--headed` to watch
- Bundled Playwright Chromium, or your installed Chrome or Opera on macOS
- Prints each session's page title and final URL

## Usage

```bash
npm install
npx playwright install chromium

# headless, bundled Chromium
node parallel.mjs https://example.com https://example.org

# visible windows, using installed Google Chrome
node parallel.mjs --headed --browser chrome https://example.com https://example.org https://example.net
```

Output:

```
session-1 [chromium] Example Domain https://example.com/
session-2 [chromium] Example Domain https://example.org/
```

Options:

| Flag | Default | Meaning |
| --- | --- | --- |
| `--headed` | off | Show browser windows |
| `--browser chromium\|chrome\|opera` | `chromium` | `chrome` and `opera` use the standard macOS app paths |

To reset a session, delete its folder: `rm -rf ~/.parallel-browsers/session-2`.

Each session currently loads its page, logs the title and closes. Extend the callback in `parallel.mjs` to script what each session does.

## Requirements

Node 18+ and Playwright 1.64+. The `chrome` and `opera` options assume `/Applications/...` paths on macOS; on other systems use the default `chromium`.

## License

MIT

Built by [Ian Royes](https://github.com/ianroyes-sys)
