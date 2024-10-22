# How to setup the project up and running

## Install dependencies

```bash
yarn install
```

## Setup the project

1. Install MySQL server version 5.6.51 - [MySQL 5.6.51]('https://downloads.mysql.com/archives/installer/')

2. Create a database
3. Replace your credentials in the `.env` file
4. Execute the script files one by one in order - `scripts/pre-scripts`
5. Execute the script files one by one in order - `scripts`
6. Run the command to generate prisma modules
   `yarn dbup`
