This is a proxy api for the bretz-austria.at website.

## What is happening here

The complete database is on googlesheets here [https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k/edit#gid=0]

you reach the api on /api/fetch-directly-from-google

without any query it wil deliver all product-categorie data, just that you see, that something is happening when you do not remember any querystring and because this is the first sheet in the googlesheet - this is just how the google visualisation api works, when you do not specify anything, it will work with the first sheet

## possible queries

- spreadSheetId (optional, when you don't specify it will use the sheet id of the google sheet mention above)
- sheetName (maybe optional, when you don't specify, it will us the first sheet)
- sqlString (optional, when you don't specify, it will show all data fields)
- delay (optional, when you don't specify, there will be no delay in returning the data)

sheetName should be something like

```bash
Produkte
Produkt-Kategorie
translations
Sprachen
options
```

sqlString should be something like

```bash
Select A, B, C
Select C, D, Y where K="this is the selector"
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
