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
        webV.configuration.userContentController.add(self, name: "jsHandler")
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
    
    func writeDataToFile(str: String)-> Bool{

        let documentsPath = NSURL(fileURLWithPath: NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0])
        let logsPath = documentsPath.appendingPathComponent("typingDna")
        print(logsPath!.path)
        do {
            try FileManager.default.createDirectory(atPath: logsPath!.path, withIntermediateDirectories: true, attributes: nil)
        } catch let error as NSError {
            NSLog("Unable to create directory \(error.debugDescription)")
        }

        let fileName = logsPath?.appendingPathComponent(".typingDna.txt")

        do{
            try str.write(to: fileName!, atomically: false, encoding: String.Encoding.utf8)
            return true
        } catch let error as NSError {
            print("Ooops! Something went wrong: \(error)")
            return false
        }
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print(message)
       if message.name == "jsHandler" {
            
            do{
                print(message.body)
                let jsonData = try JSONSerialization.data(withJSONObject: message.body, options: JSONSerialization.WritingOptions.prettyPrinted);
                print(writeDataToFile(str: String(data: jsonData, encoding: String.Encoding.utf8)!));

            } catch {
                print(error.localizedDescription)
            }
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
