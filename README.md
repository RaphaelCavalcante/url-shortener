# Node Url Shortener

Um encurtador de urls utilizando NodeJs + Express + MySql

## Antes de Começar

Baixar o repositório
```
git clone https://github.com/RaphaelCavalcante/url-shortener.git
```
ou 
```
https://github.com/RaphaelCavalcante/url-shortener/archive/master.zip
```


### Prerequisites

Node.js v8.x:

NOTE: Debian Wheezy packages are NOT available for this release. Please reference running Node.js >= 4.x on older distros.
# Using Ubuntu
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```


#Mysql 
```
$sudo apt install mysql-server
```
### Installing

Depois de baixar o projeto

```
$cd <caminho-do-source-code>
```
```
$npm install
```
```
$npm start
```
Para o banco de dados

criar um usuário no banco de dados com o nome de chaordic;
adicionar as permições no banco chaordic_url;

importar as tabelas:

```
$mysql -u chaordic -p < ~/chaordic_url.db.sql
```

## Running the tests

Antes de executar os testes, verificar se o servidor está rodando.

No projeto foi utilizado o framework FrisbyJs (https://www.frisbyjs.com/), para rodar os testes:

acessar a root do projeto e depois:
```
$npm test
```


### Arquitetura

Diretórios:

```
.
├── app.js
├── bin
│   └── www
├── chaordic_url.db.sql
├── controller
│   ├── url.controller.js
│   ├── user.controller.js
│   └── user_url.controller.js
├── database.js
├── files
├── model
│   ├── url.js
│   ├── user.js
│   └── user_url.js
├── package.json
├── package-lock.json
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   ├── stats.js
│   ├── url.js
│   ├── users.js
│   └── user_url.js
├── __tests__
│   └── api
│       ├── api_spec.js
│       ├── url_spec.js
│       └── user_spec.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

Para gerar o projeto base foi utilizado express-generator. E as rotas são especificadas com o uso do framework express.

###Banco de dados

São utilizadas Três tabelas:

##user
que armazena dados do usuário

```
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| userid | int(11)     | NO   | PRI | NULL    | auto_increment |
| id     | varchar(50) | YES  | UNI | NULL    |                |
+--------+-------------+------+-----+---------+----------------+

```
##url
que aramezena dados referentes às urls cadastradas
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| hits     | int(11)      | YES  |     | NULL    |                |
| url      | varchar(255) | YES  |     | NULL    |                |
| shortUrl | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```
##user_url
faz o relacionamento 1..n do usuário com suas urls
```
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| id      | int(11) | NO   | PRI | NULL    | auto_increment |
| user_id | int(11) | NO   |     | NULL    |                |
| url_id  | int(11) | NO   |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+

```