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
    
    @IBOutlet weak var v2: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("View loaded")
        
        self.label.stringValue = "View Loaded";
        
        let accessEnabled = AXIsProcessTrustedWithOptions(
                    [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true] as CFDictionary)
        
        print(accessEnabled);
        
        NSEvent.addGlobalMonitorForEvents(matching: .keyDown) {
            self.typingdnaKeyDown(with: $0)
        };
        
        webV.configuration.userContentController.add(self, name: "jsHandler")
        let bundleURL = Bundle.main.resourceURL!.absoluteURL
        print(bundleURL)
        let html = bundleURL.appendingPathComponent("try.html")
        print(html)
        webV.loadFileURL(html, allowingReadAccessTo:bundleURL)
        
        v2.loadHTMLString("<html><body><p>Hello!</p></body></html>", baseURL: nil)
        
    }
    
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    func typingdnaKeyDown(with event: NSEvent){
        
        print(event.keyCode);
    }
    
    @IBAction func showJSAlert(_ sender: Any) {
       let js = "hideText();"
       webV.evaluateJavaScript(js, completionHandler: nil)
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
       if message.name == "jsHandler" {
           print(message.body)
       }
    }

}

