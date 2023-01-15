# Toodles

## Použité technológie

- Next.js ako framework, aj keď jeho SSR schopnosti sa tu vôbec nevyužívajú. Ale je fajn mať všetku kompiláciu assetov, routovanie a podobné veci vyriešené od začiatku.
- Tailwind na UI, na takéto prototypy je super.
- TanStack Query pre načítavanie dát z API. Najprv som použil SWR, no robilo mi to problémy napríklad pri optimistic updates. Zmena na TanStack Query bola jednoduchá, vďaka tomu, že všetko bolo pekne schované v hooks.
- react-hook-form a zod na formuláre a validáciu
- day.js pre prácu s dátumami, aj keď ak by som nepotreboval parsovať a formátovať dátumy, nebolo by to treba
- lodash na niektoré užitočné funkcie

## Zaujímavosti

Namiesto reálneho API serveru som použil [msw](https://mswjs.io/), ktoré pomocou Service Workeru odchytí requesty z aplikácie a odpovie na ne. Týmto spôsobom demo aplikácia funguje aj offline, a mock API server sa dá tiež použiť na testovanie aplikácie. Každý request má umelé zdržanie 300 ms aby bolo vidno loading states v aplikácii. Mock API server sa spustí automaticky pri štarte aplikácie v prehliadači.

## Možné vylepšenia

Nápadov bolo veľa, bohužiaľ času menej :(

- Pridávanie todo zoznamov a itemov by mohlo mať lepšie spravený loading state. Ideálne by boli optimistic inserts, kedy by sa nový list alebo item zobrazili ihneď, bez čakania na server
- Deadline itemov je spravené cez natívny datetime input, ktorý nie je podporovaný vo všetkých prehliadačoch, a nemá zrovna najlepší UX. Lepšie by bolo spraviť vlastný input na mieru.
- Itemy sa nedajú presúvať v rámci listu, alebo medzi listami. Podpora v API na to je (každý item má list ID a weight atribúty).
- Mock API neukladá dáta v local storage, teda po znovuotvorení aplikácie sa všetko vymaže, a všetko má nové ID.
- Ak by som použil GraphQL a [urql](https://formidable.com/open-source/urql/), nemusel by som riešiť manuálne invalidovanie queries po mutáciách. Tiež by som vedel generovať typy requestov a responsov z GraphQL schémy za pomoci [GraphQL code generator](https://the-guild.dev/graphql/codegen).