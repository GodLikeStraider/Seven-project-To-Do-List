import React from 'react';

interface DialogProps {
    message:string;
    onDialog: Function;
  }

export const Dialog: React.FC<DialogProps> = ({
    message,
    onDialog
  }) => (
        <div 
          style={{
            position: "fixed",
            top: "0", 
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "40px",
                borderRadius: "15px"
            }}
            >
                <h3 style={{color: "#111"}}>{message}</h3>
                <div style={{display:"flex", alignItems:"center"}}>
                    <button
                      onClick={() => onDialog(true)}
                      style={{
                        background: "white", 
                        color:"#d27c19", 
                        padding: "10px", 
                        marginRight: "4px",
                        border: "1px solid rgba(210, 102, 25, 0.5)",
                        cursor: "pointer",
                        borderRadius: "5px",
                        width: "50px"
                        }}
                    >Да</button>
                    <button 
                      onClick={() => onDialog(false)}
                      style={{
                        background: "white", 
                        color:"#d21919", 
                        padding: "10px", 
                        marginLeft: "4px",
                        border: "1px solid rgba(210, 25, 25, 0.5)",
                        cursor: "pointer",
                        borderRadius: "5px",
                        width: "50px"
                        }}
                    >Нет</button>
                </div>
            </div>
        </div>
    );