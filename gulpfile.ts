// tslint:disable:no-imports-matching

import * as del from 'del'; // rm -rf
import * as path from 'path';

// tslint:disable:no-var-requires
const prettier = require('gulp-prettier');
const clean = require('gulp-clean');

import camelcase from 'camelcase';
import * as gulp from 'gulp';
import * as filter from 'gulp-filter';
import * as rename from 'gulp-rename';
import * as template from 'gulp-template';
import gulpTsLint from 'gulp-tslint';
import * as lodash from 'lodash';
import * as tslint from 'tslint';
import * as yargs from 'yargs';

// map of all paths
const paths = {
    componentTemplate: path.join(__dirname, 'templates', 'component/**/*.**')
};

const getName = () => yargs.argv.name || yargs.argv.n;
const getRoot = () => yargs.argv.root || yargs.argv.r;
const getCWD = (): string => process.env.INIT_CWD || '';

const getDestinationPath = () => {
    const cwd = getCWD();
    const name = getName();
    const destPath = path.join(cwd, name);
    return destPath;
};

gulp.task('clean', () =>
    gulp.src(getDestinationPath() + '/**/*.*', { read: false }).pipe(clean())
);

gulp.task(
    'component',
    gulp.series('clean', () => {
        const tsFilter = filter('**/*.ts', { restore: true });

        const program = tslint.Linter.createProgram('./tsconfig.json');

        const cwd = getCWD();
        const name = getName();
        const rootModule = getRoot() || 'llpoc';
        const appPrefix = 'llpoc';
        const destPath = getDestinationPath();

        return (
            gulp
                .src(paths.componentTemplate)
                .pipe(
                    template(
                        {
                            appPrefix: appPrefix,
                            rootModule: rootModule,
                            lowerName: camelcase(name),
                            upperName: camelcase(name, { pascalCase: true }),
                            kebabName: name
                        },
                        {}
                    )
                )
                .pipe(
                    rename(dest => {
                        dest.basename = dest.basename!.replace('temp', name);
                    })
                )
                // .pipe(tsFilter)
                // .pipe(
                //     gulpTsLint({
                //         configuration: './tslint.json',
                //         fix: true,
                //         program: program
                //     })
                // )
                // .pipe(prettier())
                .pipe(gulp.dest(destPath))
        );
    })
);
