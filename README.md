# Central PND

## Comandos úteis

### Construção da imagem

```shell
docker build -t central-pnd .
```

Após a construção da imagem, lembre-se de verificar se o compartilhamento de arquivos está ligado, para a pasa onde está o projeto.

### Execução do contêiner

```shell
docker run --rm -it -v "e:\repositorios\central-pnd:/srv/jekyll" -v "e:\repositorios\central-pnd\vendor\bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 --name central-pnd central-pnd bash
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

O endereço para acesso é [http://IP_DO_DOCKER_MACHINE/central-pnd]([http://IP_DO_DOCKER_MACHINE/central-pnd])

### Conectando num container que está rodando

```shell
docker exec -it central-pnd bash
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