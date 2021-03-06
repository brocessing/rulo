# :cyclone::tv: CLI Usage

### Installation

In order to use the `rulo` command you need to install the package globally, or create a symlink from a local installation via the `npm link` command. `sudo` may be required.

##### Global installation
```sh
sudo npm install rulo -g
```

##### Local installation and `npm link`
```sh
npm install rulo
sudo npm link rulo
```

<br>

### `rulo entry.js:bundle.js [opts] -- [rollupOpts]`

#### `--help` / `-h`
* Show help message

#### `--version` / `-v`
* Show version number for `rulo`, `rollup`, and `another-rollup-watch`

#### `--port` / `-p`
* Default: `8080`
* The port to run rulo

#### `--host` / `-H`
* The host to run rulo
* By default host is `undefined`. rulo will run on a local IP and localhost.

#### `--basedir` / `-d`
* Default: `process.cwd()`
* A path for base static content

#### `--no-live`
* Disable LiveReload integration

#### `--live-port` / `-l`
* Default: 35729
* The LiveReload port

#### `--watch-glob` / `--wg`
* Default: `'**/*.{html,css}'`
* Glob(s) to watch for livereload

#### `--pushstate` / `-P`
* Always render the index page instead of a 404 page

#### `--pushstate` / `-P`
* Always render the index page instead of a 404 page

#### `--config` / `-c`
* A path to a Rollup config file

#### `--no-overlay`
* Disable the DOM-based error reporter

#### `--config` / `-c`
* Log additional informations

#### `--quiet` / `-q`
* Don't write to the console
