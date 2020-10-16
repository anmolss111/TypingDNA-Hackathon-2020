//
//  ViewController.swift
//  typingDNA
//
//  Created by Anmol Suri on 16/10/20.
//

import Cocoa

class ViewController: NSViewController {
    
    @IBOutlet weak var label: NSTextField!
    
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
    }
    
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    func typingdnaKeyDown(with event: NSEvent){
        
        print(event.keyCode);
    }

}

