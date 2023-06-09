# ChatHub

## Features


### Notendaumsjón

#### Nýskráning
Þegar þú býrð til aðgang þarftu að skrá þig inn með svokölluðu referral id. Referral id er auðkenni sem þú færð frá vini þínum sem á nú þegar ChatHub account. Þegar þú nýskráir þig þá er sjálfkrafa send vinabeiðni á þann vin sem gaf þér þennan referral id.


#### Innskráning
Hægt er að skrá sig inn eftir að gerður er aðgangur. Þá færðu að sjá allar upplýsingar sem tengjast þér, það eru:
- Færslur frá þér og vinum á tímalínu
- Innkomandi vinabeiðnir
- Listi af vinum sem þú átt
- Hvaða færslur þér líkar við

#### Útfærsla
Notendaumsjón er útfærð með DBAuth sem er innifalið í RedwoodJS frameworkinu. Allir endapunktarnir í APAnum þurfa authentication þar sem gögnin eru öðruvísi fyrir hvern notanda.

### Prófílmyndir
Allir eru með prófílmynd á síðunni. Þegar þú skráir þig inn fyrst færðu afhenda default prófílmynd en hægt er að breyta henni inn á aðgangum þínum.

#### Útfærsla
Prófílmyndirnar sjálfar eru geymdar með firebase, en vísun á þá eru geymdar í gagnagrunni.

API endapunktur er útfærður til að vista vísuninni í gagnagrunni en prófílmynd er send beint úr framenda yfir á firebase.


### Vinakerfi
#### Vinabeiðnir
Hægt er að senda og samþykkja vinabeiðnir. Þú sendir vinabeiðni með því að fara á aðgang hjá þeim sem þú vilt senda vinabeiðni.

Hægt er að samþykkja/hafna vinabeiðnum með því að smella á takkann í efra hægra horninu og velja þá aðila sem þú vilt samþykkja eða hafna.

Ef þú sendir vinabeiðni á einhvern sem hefur nú þegar sent þér vinabeiðni þá verðið þið sjálfkrafa vinir.

#### Vinalisti
Hægt er að sjá hverjir eru vinir þínir með því að fara inn á prófílinn þinn. Einnig er hægt að skoða vini annarra með því að fara inn á prófíl þeirra.

#### Útfærsla
Öll vinavensl eru geymdar í gagnagrunni sem many-to-many vensl. Endapunktar eru útfærðir til að sjá vinabeiðnir, sjá vini, senda vinabeiðni og samþykkja/hafna vinabeiðni.

Einnig eru React compontentar útfærðir til að útfæra þessa virkni í framenda.

### Tímalína
Hægt er bæta inn hvaða pistla sem er inn á tímalínu sem síðan er hægt að deila með öðrum. Þú getur séð alla pistla hjá vini þínum flokkaðir í tímaröð og allir vinir þínir geta séð þína pistla á sinni tímalínu

Einnig er hægt að líka við pistla með því að ýta á like takkann. Einungis er hægt að líka við pistil einu sinni. Þegar pistill er like-aður hækkar like fjöldinn á honum


#### Útfærsla
##### Gagnagrunnur
Like og Post eru geymd í gagnagrunni.

Hver pistill er geymdur í Post töflunni og er tengdur við user.

Like er many-to-many vensl skilgreint með userId og postId.

##### API
Endapunktar eru útfærðir til að skoða pistla hjá vinum, búa til nýja pistla og like-a pistla.

##### Framendi
React componentar eru búnir til til að útfæra alla API virkni.

### Kröfur
Þetta webapp útfærir 4 meginkröfur sem gefnar voru fyrir verkefnið sem eru:
- Notendaumsjón ✅
- API útfærður með GraphQL ✅
- Viðmót útfært með template máli (React) ✅
- Gagnagrunnur notaður (Postgres í production, sqlite í dev) ✅
## Branches
- main
  - Aðal branchið fyrir nýja featura
  - Inniheldur dev build
  - Allt local
- Production
  - Inniheldur production build
  - Gagnagrunnur á railway
  - Client og API tengjast við netlify

## Uppsetning á eigin tölvu með yarn

### Forkrafa:
> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

### Ath.
Gæti verið aðeins öðruvísi á Windows, mæli með að skoða hlekkinn fyrir ofan.


### Uppsetning

1. Byrjaðu á að keyra
```
yarn
```
til að fá öll dependency.

2. Keyrðu nú
```
yarn rw prisma migrate dev
```
til að setja upp gagnagrunninn.

3. Keyrðu

```
yarn rw setup auth dbAuth
```
Veldu **No** fyrir hvert prompt sem kemur upp.

Nú hefur þú sett upp auðkenningu locally.

4. Nú getur þú keyrt
```
yarn rw dev
```
Það keyrir upp vefþjónustuna, líklegast á localhost:8910 og þar geturðu notað síðuna á þinni eigin tölvu.



Ef það er eitthvað vesen þá er alltaf hægt að fara inn á live síðuna
## Test accountar

Innifalið í þessu repo-i eru 7 test aðgangar. Þeir eru test1, test2 ... test7. Allir aðgangarnir hafa sama lykilorð sem er **pass**.

T.d. til að logga sig inn á test7 myndi maður fara inn á login síðuna og gera:

Email: test7

Password: pass



----------

# Auka

---
## Meira um Redwood

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
