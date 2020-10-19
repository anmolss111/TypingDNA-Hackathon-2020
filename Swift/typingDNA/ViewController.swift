//
//  ViewController.swift
//  typingDNA
//
//  Created by Anmol Suri on 16/10/20.
//

import Cocoa
import WebKit

class ViewController: NSViewController, WKScriptMessageHandler {
    
    @IBOutlet weak var label: NSTextField!
    
    @IBOutlet weak var webV: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.label.stringValue = "View Loaded";
        
//        webV.configuration.userContentController.add(self, name: "jsHandler")
//        let bundleURL = Bundle.main.resourceURL!.absoluteURL
//        print(bundleURL)
//        let html = bundleURL.appendingPathComponent("index.html")
//        webV.loadFileURL(html, allowingReadAccessTo:bundleURL)
        
        let url = URL(string: "http://localhost:4200/")!
        webV.load(URLRequest(url: url))
        webV.allowsBackForwardNavigationGestures = true
    }
    
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @IBAction func showJSAlert(_ sender: Any) {
       let js = "hideText();"
       webV.evaluateJavaScript(js, completionHandler: nil)
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print(message)
       if message.name == "jsHandler" {
           print(message.body)
       }
    }
    
    static func newInsatnce() -> ViewController {
                
        let storyboard = NSStoryboard(name: NSStoryboard.Name("Main"), bundle: nil)
        let identifier = NSStoryboard.SceneIdentifier("ViewController")
                
        guard let viewcontroller = storyboard.instantiateController(withIdentifier: identifier) as? ViewController else {
            fatalError("Unable to instantiate ViewController in Main.storyboard")
        }
        
        return viewcontroller
    }
    
}
