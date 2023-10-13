# Tor-Router Web Gui

## Description

**Tor-Router Web Gui** allows you to manage and monitor [Tor-Router](https://github.com/m4dm4x1337/tor-router) remotely via a web browser.

![Screenshot 1](https://raw.githubusercontent.com/m4dm4x1337/tor-router-web-gui/master/resources/images/screenshot1.png)
![Screenshot 2](https://raw.githubusercontent.com/m4dm4x1337/tor-router-web-gui/master/resources/images/screenshot2.png)

## Installation

Download the Debian package and run this commands:

```bash
sudo dpkg -i tor-router-web-gui_1.0_all.deb || sudo apt-get -f install
```

The `tor-router-web-gui` package depends on the `tor-router` package which should be [installed first](https://github.com/m4dm4x1337/tor-router#installation).

## Usage

To start the Tor-Router Web Gui service run this command:

```bash
systemctl start tor-router-web-gui.service
```

You can open the Web Gui in your browser at the following address:

```text
http://127.0.0.1:8080/cgi-bin/tor-router-web-gui
```

## Configuration

The Tor-Router Web Gui configuration can be customized by editing the `/etc/default/tor-router-web-gui` file. The configuration file contains a few options that control the behavior of the HTTP Server. Below are the configurable variables and their explanations:

- **ADDRESS** (The listening address): The IPv4 address of the HTTP server. The default value is 127.0.0.1, which makes the server accessible only on the local computer.

- **PORT** (The listening port): The port number of the HTTP Server. The default value is 8080 (http-alt).

- **USERNAME** (The HTTP authentication username): The default value is an empty string.

- **PASSWORD** (The HTTP authentication password): The default value is an empty string.

**If neither user name nor password has been specified, unrestricted access is possible.**

## Alternative graphical user interface (GUI)

There are **two** graphical user interfaces!

The first is an [app indicator for the GNOME desktop](https://github.com/m4dm4x1337/tor-router-gnome) that allows you to easily start/stop Tor-Router. You can also see whether Tor-Router is running or not based on the color of the icon and the label text next to the icon.

The second is this web GUI that can display a lot of additional information and enable remote management and monitoring of Tor-Router.

## Internationalization (i18n)

Tor-Router and its GUIs are able to use language files to display text in the user's language. So far, the only additional language other than English is German. If you want to create another language file, download the German .po file (which also contains the English translations), and replace all the "msgstr" entries (there aren't too many). Then send me a pull request or simply post the file to the issue tracker (if you don't know how to git).

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the GPLv3 License. See the COPYING file for details.

## Author

The Tor-Router Gnome Debian package was created by m4dm4x1337.

## Donations 🥺

 ❤️ Please donate ❤️

![QR code for donations](https://raw.githubusercontent.com/m4dm4x1337/tor-router-gnome/master/tor-router-gnome/usr/share/pixmaps/tor-router-gnome-donation.png)

This project is open source, and the only income comes from the donators. If you like the project, please donate, thank you!

[bitcoin:bc1q9ha0l0tt7dghcpgext8jppejandefeshcukpxx](bitcoin:bc1q9ha0l0tt7dghcpgext8jppejandefeshcukpxx)
