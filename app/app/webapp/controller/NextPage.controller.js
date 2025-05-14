


//-------------------------------------------------------------------------------------------------------------------correct code
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/core/UIComponent"
// ], function (Controller, JSONModel, UIComponent) {
//     "use strict";

//     return Controller.extend("app.controller.NextPage", {
//         onInit: function () {
//             console.log("✅ NextPage Controller Initialized");

//             var oRouter = UIComponent.getRouterFor(this);
//             oRouter.getRoute("NextPage").attachPatternMatched(this._onRouteMatched, this);
//         },

//         _onRouteMatched: function (oEvent) {
//             console.log("🔹 Route matched - setting up employee data");

//             var sEmployeeID = oEvent.getParameter("arguments").employeeID;
//             console.log("🔹 Employee ID received:", sEmployeeID); 

//             if (!sEmployeeID) {
//                 console.error("❌ Employee ID is undefined!");
//                 return;
//             }

//             var oEmployeeModel = new JSONModel();
//             this.getView().setModel(oEmployeeModel, "EmployeeData");

//             // Fetch employee details via AJAX
//             $.ajax({
//                 url: "/odata/v4/employee/Employees/" + sEmployeeID, 
//                 type: "GET",
//                 dataType: "json",
//                 success: function (data) {
//                     console.log("✅ Employee details loaded:", data);
                    
//                     // Ensure correct JSON structure for binding
//                     oEmployeeModel.setData({ EmployeeDetail: data });

//                     this.getView().getModel("EmployeeData").refresh(); // Refresh UI
//                 }.bind(this),
//                 error: function (xhr, status, error) {
//                     console.error("❌ Error loading employee details:", error);
//                 }
//             });

//             // Debugging: Ensure model is correctly assigned
//             console.log("🔹 Model Instance:", this.getView().getModel("EmployeeData"));
//         },

//         onNavigateBack: function () {
//             var oRouter = UIComponent.getRouterFor(this);
//             oRouter.navTo("EmployeeDetail"); 
//         }
//     });
// });
//---------------------------------------------------------------------------------------------------------------------
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/core/UIComponent"
// ], function (Controller, JSONModel, UIComponent) {
//     "use strict";

//     return Controller.extend("app.controller.NextPage", {
//         onInit: function () {
//             console.log("✅ NextPage Controller Initialized");

//             var oRouter = UIComponent.getRouterFor(this);
//             oRouter.getRoute("NextPage").attachPatternMatched(this._onRouteMatched, this);

//             // Create a default model to track Joining Date
//             var oStudentModel = new JSONModel({
//                 EmployeeDetail: {
//                     JoiningDate: "" // Default empty value
//                 }
//             });
//             this.getView().setModel(oStudentModel, "EmployeeData");
//         },

//         _onRouteMatched: function (oEvent) {
//             console.log("🔹 Route matched - setting up employee data");

//             var sEmployeeID = oEvent.getParameter("arguments").employeeID;
//             console.log("🔹 Employee ID received:", sEmployeeID); 

//             if (!sEmployeeID) {
//                 console.error("❌ Employee ID is undefined!");
//                 return;
//             }

//             var oEmployeeModel = this.getView().getModel("EmployeeData");

//             // Fetch employee details via AJAX
//             $.ajax({
//                 url: "/odata/v4/employee/Employees/" + sEmployeeID, 
//                 type: "GET",
//                 dataType: "json",
//                 success: function (data) {
//                     console.log("✅ Employee details loaded:", data);

//                     // Ensure Joining Date is included
//                     if (!data.JoiningDate) {
//                         console.warn("⚠️ Joining Date is missing in the API response!");
//                         data.JoiningDate = ""; // Default empty value
//                     }

//                     // Update model with fetched data
//                     oEmployeeModel.setProperty("/EmployeeDetail", data);

//                     this.getView().getModel("EmployeeData").refresh(); // Refresh UI
//                 }.bind(this),
//                 error: function (xhr, status, error) {
//                     console.error("❌ Error loading employee details:", error);
//                 }
//             });

//             // Debugging: Ensure model is correctly assigned
//             console.log("🔹 Model Instance:", this.getView().getModel("EmployeeData"));
//         },

//         onDateChange: function (oEvent) {
//             var sSelectedDate = oEvent.getSource().getDateValue();
//             console.log("📅 Selected Joining Date:", sSelectedDate);

//             var oEmployeeModel = this.getView().getModel("EmployeeData");
//             if (oEmployeeModel) {
//                 oEmployeeModel.setProperty("/EmployeeDetail/JoiningDate", sSelectedDate);
//                 console.log("✅ Updated model with Joining Date:", oEmployeeModel.getData());
//             } else {
//                 console.error("❌ Model 'EmployeeData' is not found!");
//             }
//         },

//         onNavigateBack: function () {
//             var oRouter = UIComponent.getRouterFor(this);
//             oRouter.navTo("EmployeeDetail"); 
//         }
//     });
// });
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, JSONModel, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("app.controller.NextPage", {
        onInit: function () {
            console.log("✅ NextPage Controller Initialized");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("NextPage").attachPatternMatched(this._onRouteMatched, this);

            // Create a default model for Employee Info
            var oEmployeeModel = new JSONModel({
                EmployeeDetail: {
                    ID: "",
                    Name: "",
                    Role: "",
                    Qualification: "",
                    Joining_Date: "", // Default empty value
                    MailID: "",
                    Contact:"",
                    Address: "",
                    

                }
            });

            this.getView().setModel(oEmployeeModel, "EmployeeData");
        },

        _onRouteMatched: function (oEvent) {
            console.log("🔹 Route matched - Loading employee data");

            var sEmployeeID = oEvent.getParameter("arguments").employeeID;

            if (!sEmployeeID) {
                console.error("❌ Employee ID is missing!");
                MessageToast.show("Invalid Employee ID!");
                return;
            }

            var oEmployeeModel = this.getView().getModel("EmployeeData");

            // Fetch Employee Details via API
            $.ajax({
                url: "/odata/v4/employee/Employees/" + sEmployeeID,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("✅ Employee details loaded:", data);

                    // Ensure Joining Date is included
                    if (!data.Joining_Date) {
                        console.warn("⚠️ Joining Date missing from API response!");
                        data.Joining_Date = ""; // Default empty value
                    }

                    // Update model with employee data
                    oEmployeeModel.setProperty("/EmployeeDetail", data);
                    this.getView().getModel("EmployeeData").refresh(); // Refresh UI
                }.bind(this),
                error: function (xhr, status, error) {
                    console.error("❌ Error loading employee details:", error);
                    MessageToast.show("Failed to load employee details.");
                }
            });

            console.log("🔹 Model Instance:", this.getView().getModel("EmployeeData"));
        },

        onDateChange: function (oEvent) {
            var sSelectedDate = oEvent.getSource().getDateValue();
            console.log("📅 Selected Joining Date:", sSelectedDate);

            var oEmployeeModel = this.getView().getModel("EmployeeData");

            if (oEmployeeModel) {
                oEmployeeModel.setProperty("/EmployeeDetail/Joining_Date", sSelectedDate);
                console.log("✅ Updated model with Joining Date:", oEmployeeModel.getData());
                MessageToast.show("Joining Date Updated: " + sSelectedDate);
            } else {
                console.error("❌ Model 'EmployeeData' is not found!");
                MessageToast.show("Error updating Joining Date!");
            }
        },

        onNavigateBack: function () {
            console.log("⬅️ Navigating back to Employee Details");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("EmployeeDetail");
        }
    });
});
