import {Injectable} from "@angular/core";
import {ScriptStore} from "./script.store";

declare var document: any;

/*
    This service is based on this solution: http://stackoverflow.com/questions/34489916/load-external-js-script-dynamically-in-angular-2

    It is the last comment

 */

@Injectable()
export class ScriptsService {

    private scripts: any = {};

    constructor() {
        ScriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                scriptTag: script.scriptTag,
                scriptType: script.scriptType,
                src: script.src,
            };
        });
    }

    load(...scripts: string[]) {
        var promises: any[] = [];

        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            //resolve if already loaded
            if (this.scripts[name].loaded) {
                resolve({script: name, loaded: true, status: 'Already Loaded'});
            }
            else {
                //load script
                let script = document.createElement(this.scripts[name].scriptTag);
                script.type = this.scripts[name].scriptType;


                if (this.scripts[name].scriptTag === 'script'){
                    script.src = this.scripts[name].src;
                }

                if (this.scripts[name].scriptTag === 'link'){
                    script.href = this.scripts[name].src;
                    script.rel = "stylesheet";
                }

                if (script.readyState) {  //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({script: name, loaded: true, status: 'Loaded'});
                        }
                    };
                } else {  //Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    };
                }
                script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }

}