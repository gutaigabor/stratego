FROM mongo:3.6

RUN mkdir -p /var/lib/mongodb && chmod ugo+rwx /var/lib/mongodb

COPY ./init/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["mongod", "--auth", "--smallfiles", "--bind_ip_all", "--dbpath", "/var/lib/mongodb"]