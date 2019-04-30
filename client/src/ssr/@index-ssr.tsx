// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import Loadable from 'react-loadable';
// import {Bundle, getBundles} from 'react-loadable/webpack';
// import {StaticRouter} from 'react-router';

// import stats from '../../build/react-loadable.json';
// // tslint:disable-next-line: import-path-shallowest
// import {AppRoutes} from '../app/routes';

// interface SSRPayload {
//   html: string;
//   scripts: string[];
// }

// export class SSR {
//   render(url: string, data: unknown): SSRPayload {
//     const modules: string[] = [];
//     const context = {};
//     const html = ReactDOMServer.renderToString(
//       <Loadable.Capture report={moduleName => modules.push(moduleName)}>
//         <StaticRouter location={url} context={context}>
//           <AppRoutes initData={data} />
//         </StaticRouter>
//       </Loadable.Capture>,
//     );

//     const bundles: Bundle[] = getBundles(stats as any, modules);

//     return {
//       html,
//       scripts: this.generateBundleScripts(bundles),
//     };
//   }

//   generateBundleScripts(bundles: Bundle[]): string[] {
//     return bundles
//       .filter(bundle => bundle.file.endsWith('.js'))
//       .map(
//         bundle =>
//           `<script type="text/javascript" src="${bundle.file}"></script>`,
//       );
//   }

//   static preloadAll(): Promise<void> {
//     return Loadable.preloadAll();
//   }
// }
