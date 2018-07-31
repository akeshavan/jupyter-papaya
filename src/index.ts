import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette
} from '@jupyterlab/apputils';
import '../style/index.css';
import '../style/papaya.css';
import {
  Widget
} from '@phosphor/widgets';


declare var papaya: any;
//declare var require: any
//var papaya = require('./papaya');

/**
 * Initialization data for the nbpapaya-ext extension.
 */

const extension: JupyterLabPlugin<void> = {
  id: 'nbpapaya-ext',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension nbpapaya-ext foo is activated!');

    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'nbpapaya-jupyterlab';
    widget.title.label = 'papaya.js';
    widget.title.closable = true;

    // AK's hack:
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://cdn.rawgit.com/rii-mango/Papaya/67d9734a/release/current/standard/papaya.js'; //'https://cdn.rawgit.com/rii-mango/Papaya/67d9734a/release/current/nojquery/papaya.js';
    s.onload = () => {
      console.log('papaya object', papaya);
      papaya.Container.addViewer('papaya', {});
    };
    widget.node.appendChild(s);

    // Add an image element to the panel
    let pdiv = document.createElement('div');
    pdiv.classList.add("papaya");
    pdiv.id = "papaya";
    widget.node.appendChild(pdiv);

    // Fetch info about a random comic
    /*fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
      return response.json();
    }).then(data => {
      pdiv.src = data.img;
      img.alt = data.title;
      img.title = data.alt;
    });*/

    //console.log('papaya object is', papaya);

    // Add an application command
    const command: string = 'papaya:open';
    app.commands.addCommand(command, {
      label: 'New Papaya Viewer',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      },
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'Papaya Image Viewer'});
  }
};


export default extension;
