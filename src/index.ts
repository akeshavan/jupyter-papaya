import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the nbpapaya-ext extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'nbpapaya-ext',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension nbpapaya-ext is activated!');
  }
};

export default extension;
