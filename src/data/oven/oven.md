# Oven startup
Startups are typically very economically conscious with regard to capital investment. As industrial ovens were prohibitively expensive, a startup consulted me regarding making a custom-built oven.

As custom-built machines are even more expensive, I suggested the modification of a cheap consumer oven may fulfill their requirements with significant savings over industrial ovens.

Project requirements included:
* Temperature logging
* Humidity logging
* CSV export of data
* Digital control

Hardware and software used in the project include:
* Raspberry Pi
* I2C humidity & temperature sensor
* InfluxDB (time series DB)
* Grafana web server
* On/off digital temperature controller