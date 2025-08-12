import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        await page.goto(f'file://{file_path}')

        # Wait for the images to load
        await page.wait_for_selector('img[alt="Financial Literacy"]')
        await page.wait_for_selector('img[alt="Adopt-a-DAP"]')
        await page.wait_for_selector('img[alt="FDA Program"]')
        await page.wait_for_selector('img[alt="Financial Aid Readiness"]')
        await page.wait_for_selector('img[alt="Adult Literacy"]')

        # Take a screenshot of the "Our Programs" section
        element = await page.query_selector('.grid-3-cols')
        if element:
            await element.screenshot(path='jules-scratch/verification/verification.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
