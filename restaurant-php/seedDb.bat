Del db.sqlite
call vendor/bin/doctrine orm:schema-tool:update --force --dump-sql

php create_company.php "McDonald's" https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png
php create_company.php KFC https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png

php create_menu.php Drinks 1
php create_menu.php Desserts 1
php create_menu.php Starters 2

php create_location.php London 50 Jack 1
php create_location.php Norwich 75 Ben 1