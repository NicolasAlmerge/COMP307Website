## Backend
Backend of a MERN project is made of NodeJS and Express. The JavaScript packages that are necessary to run the project are already listed in the `package.json` file. To install the packages use the following commands:
```
$ cd ta-management/backend
$ npm install
```
The `npm install` command will install the packages listed under `dependencies` and `devDependencies` section in `package.json` file.

Once the packages are installed, you should have a new folder called `node_modules` and a new file called `package-lock.json`. `node_modules` will contain binaries and `package-lock.json` will contain the version, registry and hashes of the installed packages.

Next to build the backend, run
```
$ npm run build
```
If you look at the `package.json` file under the `script` section, there is a key called `build` which has the value `tsc`. With the above command, we are basically running this script. `tsc` (stands for TypeScript Compiler) is a command that will compile the code and produce a binary, in our case in the `dist` folder.

Once the project is built, you can run the backend using the command
```
$ npm run start
```

If you look into the `package.json` file, you will realise that `start` translates to `node dist/src/app.js` which is an instruction for node to run the compiled binary.

A successful completion of these steps will result in the following output on the terminal.
```
$ npm run start

> comp307-f22-mern-backend-starter@0.0.1 start
> node dist/src/app.js

Backend is running on port: 3000
Database is connected!
```

Keep the process running.

---