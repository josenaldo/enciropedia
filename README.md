# Central PND

## Comandos úteis

### Construção da imagem

```shell
docker build -t enciropedia .
```

Após a construção da imagem, lembre-se de verificar se o compartilhamento de arquivos está ligado, para a pasa onde está o projeto.

### Execução do contêiner

```shell
docker run --rm -it -v "e:\repositorios\enciropedia:/srv/jekyll" -v "e:\repositorios\enciropedia\vendor\bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 --name enciropedia enciropedia bash
```

Se estiver no Linux:

```shell
docker run --rm -it -v ".:/srv/jekyll" -v "./vendor/bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 --name enciropedia enciropedia bash
```


Se, após a execução desse comando, ocorrer algum problema com o docker em relação a diretórios já existente, atualize o docker e reinicie a máquina.

Talvez, reiniciar o docker-machine ou o próprio docker funcione. Teste essa hipótese.

### Pra executar o servidor de desenvolvimento

```shell
jekyll serve --watch --force-polling --livereload
```

### Descobrindo o IP do servidor de teste

```shell
docker-machine ip
```

O endereço para acesso é [http://IP_DO_DOCKER_MACHINE/enciropedia]([http://IP_DO_DOCKER_MACHINE/enciropedia])

### Conectando num container que está rodando

```shell
docker exec -it enciropedia bash
```

### Se precisar reconectar num servidor que já está rodando

```shell
killall jekyll
```

ou

```shell
pkill -u jekyll
```

### Configurando o Git

git config --global user.email "josenaldo@gmail.com"
git config --global user.name "Josenaldo de Oliveira Matos Filho"

## Base para o projeto

- Tema: [https://bootswatch.com/darkly/](https://bootswatch.com/darkly/)
- Template: [https://startbootstrap.com/template/modern-business][https://startbootstrap.com/template/modern-business]
- [Bootstrap](https://getbootstrap.com/)
- [Jekyll](http://jekyllrb.com/)
- [PurePajinate](https://github.com/obuisard/purePajinate)
- [Lunr.js](https://lunrjs.com/)