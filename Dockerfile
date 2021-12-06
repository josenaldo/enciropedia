FROM jekyll/jekyll:4.2.0

LABEL author Josenaldo Matos

VOLUME [ "/srv/jekyll", "/usr/local/bundle" ]

ENV JEKYLL_ENV production

EXPOSE 4000

RUN gem install reduce
RUN gem install jekyll-seo-tag
RUN gem install jekyll-sitemap
RUN gem install jekyll-scholar
RUN gem install jekyll-feed

RUN chmod 777 /srv/jekyll

RUN git config --global user.email "josenaldo@gmail.com"
RUN git config --global user.name "Josenaldo de Oliveira Matos Filho"
