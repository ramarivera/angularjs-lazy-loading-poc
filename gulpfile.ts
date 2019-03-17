// tslint:disable:no-imports-matching

import * as del from 'del'; // rm -rf

import * as once from 'async-once';
import camelcase from 'camelcase';
import * as gulp from 'gulp';
import * as clean from 'gulp-clean';
import * as prettier from 'gulp-prettier';
import * as rename from 'gulp-rename';
import * as template from 'gulp-template';
import tslint from 'gulp-tslint';
import * as lodash from 'lodash';
import * as path from 'path';
import * as yargs from 'yargs';

// map of all paths
const paths = {
    componentTemplate: path.join(__dirname, 'templates', 'component/**/*.**')
};

const getName = () => yargs.argv.name || yargs.argv.n;
const getRoot = () => yargs.argv.root || yargs.argv.r;
const getCWD = () => process.env.INIT_CWD;

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
        const cwd = getCWD();
        const name = getName();
        const rootModule = getRoot() || 'MPM';
        const appPrefix = 'mpm';
        const destPath = getDestinationPath();

        return (
            gulp
                .src(paths.componentTemplate)
                .pipe(
                    template({
                        appPrefix: appPrefix,
                        rootModule: rootModule,
                        lowerName: camelcase(name),
                        upperName: camelcase(name, { pascalCase: true }),
                        kebabName: name
                    })
                )
                .pipe(
                    rename(dest => {
                        dest.basename = dest.basename.replace('temp', name);
                    })
                )
                .pipe(tslint())
                // .pipe(prettier())
                .pipe(gulp.dest(destPath))
        );
    })
);
