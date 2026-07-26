from playwright.sync_api import sync_playwright

URL = "http://localhost:5175/article/1001"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    errors = []
    console_msgs = []
    page.on("console", lambda m: console_msgs.append(f"[{m.type}] {m.text}"))
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(2000)
    print("=== PAGE ERRORS ===")
    for e in errors:
        print(e)
    print("=== CONSOLE ===")
    for m in console_msgs:
        print(m)
    print("=== RENDERED MARKDOWN-BODY HTML ===")
    body = page.query_selector(".markdown-body")
    if body:
        print(body.inner_html()[:2000])
    else:
        print("NO .markdown-body element found")
    # also dump article h1 text
    h1 = page.query_selector("h1")
    print("=== H1 ===", h1.inner_text() if h1 else "none")
    page.screenshot(path="c:/Users/k'k/Desktop/myblog2/myblog/_article.png", full_page=True)
    browser.close()
