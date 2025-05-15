
// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller",
// //     "sap/ui/model/json/JSONModel",
// //     "sap/ui/core/UIComponent",
// //     "sap/m/MessageToast"
// // ], function (Controller, JSONModel, UIComponent, MessageToast) {
// //     "use strict";

// //     return Controller.extend("app.controller.NextPage", {
// //         onInit: function () {
// //             console.log("✅ NextPage Controller Initialized");

// //             var oRouter = UIComponent.getRouterFor(this);
// //             oRouter.getRoute("NextPage").attachPatternMatched(this._onRouteMatched, this);

// //             // Create a default model for Employee Info
// //             var oEmployeeModel = new JSONModel({
// //                 EmployeeDetail: {
// //                     ID: "",
// //                     Name: "",
// //                     Role: "",
// //                     Qualification: "",
// //                     Joining_Date: "", // Default empty value
// //                     MailID: "",
// //                     Contact:"",
// //                     Address: "",
// //                     Project_Name: "",
// //                      Manager: "",
// //                       Client_Name: "", 
// //                       Team_Lead_Name: "",
                     
                    

// //                 }
// //             });

// //             this.getView().setModel(oEmployeeModel, "EmployeeData");
// //         },

// //         _onRouteMatched: function (oEvent) {
// //             console.log("🔹 Route matched - Loading employee data");

// //             var sEmployeeID = oEvent.getParameter("arguments").employeeID;

// //             if (!sEmployeeID) {
// //                 console.error("❌ Employee ID is missing!");
// //                 MessageToast.show("Invalid Employee ID!");
// //                 return;
// //             }

// //             var oEmployeeModel = this.getView().getModel("EmployeeData");

// //             // Fetch Employee Details via API
// //             $.ajax({
// //                 url: "/odata/v4/employee/Employees/" + sEmployeeID,
// //                 type: "GET",
// //                 dataType: "json",
// //                 success: function (data) {
// //                     console.log("✅ Employee details loaded:", data);

// //                     // Ensure Joining Date is included
// //                     if (!data.Joining_Date) {
// //                         console.warn("⚠️ Joining Date missing from API response!");
// //                         data.Joining_Date = ""; // Default empty value
// //                     }

// //                     // Update model with employee data
// //                     oEmployeeModel.setProperty("/EmployeeDetail", data);
// //                     this.getView().getModel("EmployeeData").refresh(); // Refresh UI
// //                 }.bind(this),
// //                 error: function (xhr, status, error) {
// //                     console.error("❌ Error loading employee details:", error);
// //                     MessageToast.show("Failed to load employee details.");
// //                 }
// //             });

// //             console.log("🔹 Model Instance:", this.getView().getModel("EmployeeData"));
// //         },

// //         onDateChange: function (oEvent) {
// //             var sSelectedDate = oEvent.getSource().getDateValue();
// //             console.log("📅 Selected Joining Date:", sSelectedDate);

// //             var oEmployeeModel = this.getView().getModel("EmployeeData");

// //             if (oEmployeeModel) {
// //                 oEmployeeModel.setProperty("/EmployeeDetail/Joining_Date", sSelectedDate);
// //                 console.log("✅ Updated model with Joining Date:", oEmployeeModel.getData());
// //                 MessageToast.show("Joining Date Updated: " + sSelectedDate);
// //             } else {
// //                 console.error("❌ Model 'EmployeeData' is not found!");
// //                 MessageToast.show("Error updating Joining Date!");
// //             }
// //         },

// //         onNavigateBack: function () {
// //             console.log("⬅️ Navigating back to Employee Details");
// //             var oRouter = UIComponent.getRouterFor(this);
// //             oRouter.navTo("EmployeeDetail");
// //         }
// //     });
// // });

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/unified/DateTypeRange"
// ], function (Controller, JSONModel, DateTypeRange) {
//     "use strict";

//     return Controller.extend("app.controller.NextPage", {
//         onInit: function () {
//             // Employee Data Model
//             var oEmployeeData = {
//                 EmployeeDetail: {
//                     Name: "John Doe",
//                     ID: "E12345",
//                     Role: "Software Engineer",
//                     Qualification: "Master's in Computer Science",
//                     MailID: "johndoe@example.com",
//                     Joining_Date: "2023-07-15"
//                 },
//                 HikeExperience: [
//                     { Experience: "0-2 Years", Hike: 5 },
//                     { Experience: "3-5 Years", Hike: 15 },
//                     { Experience: "6+ Years", Hike: 25 }
//                 ]
//             };

//             // Performance Data Model
//             var oPerformanceData = {
//                 Performance: [
//                     { Year: "2021", Performance: 60 },
//                     { Year: "2022", Performance: 75 },
//                     { Year: "2023", Performance: 85 }
//                 ]
//             };

//             // Initialize Models
//             var oEmployeeModel = new JSONModel(oEmployeeData);
//             var oPerformanceModel = new JSONModel(oPerformanceData);

//             // Set Models to View
//             this.getView().setModel(oEmployeeModel, "EmployeeData");
//             this.getView().setModel(oPerformanceModel, "PerformanceData");

//             // Highlight Joining Date in Calendar
//             var oCalendar = this.getView().byId("employeeCalendar");
//             if (oCalendar) {
//                 var oJoiningDate = new Date(oEmployeeData.EmployeeDetail.Joining_Date);

//                 var oDateRange = new DateTypeRange({
//                     startDate: oJoiningDate,
//                     type: "Type01" // Green highlight
//                 });

//                 oCalendar.addSpecialDate(oDateRange);
//             }

//             console.log("Performance Data:", oPerformanceModel.getData());
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

            // Get router instance and attach event
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("NextPage").attachPatternMatched(this._onRouteMatched, this);

            // Create a default model for Employee Info
            var oEmployeeModel = new JSONModel({
                EmployeeDetail: {
                    ID: "",
                    Name: "",
                    Role: "",
                    Qualification: "",
                    Joining_Date: "",
                    MailID: "",
                    Contact: "",
                    Address: "",
                    Project_Name: "",
                    Manager: "",
                    Client_Name: "",
                    Employee_of_the_year: "",
                    Team_Lead_Name: "",
                    Experience: 0,
                    Hike: 0,
                    
                },
                HikeExperience: [] // Store Graph Data
            });

            this.getView().setModel(oEmployeeModel, "EmployeeData");
        },

        _onRouteMatched: function (oEvent) {
            console.log("🔹 Route matched - Fetching employee data");

            var sEmployeeID = oEvent.getParameter("arguments").employeeID;
            if (!sEmployeeID) {
                console.error("❌ Employee ID is missing!");
                MessageToast.show("Invalid Employee ID!");
                return;
            }

            var oEmployeeModel = this.getView().getModel("EmployeeData");

            // Fetch Employee Data via API
            $.ajax({
                url: "/odata/v4/employee/Employees/" + sEmployeeID,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("✅ Employee details loaded:", data);

                    var experience = parseInt(data.Experience) || 0;
                    var hike = parseFloat(data.Hike) || 0;

                    // Prepare Graph Data
                    var graphData = [
                        { Category: "Experience (Years)", Value: experience },
                        { Category: "Hike (%)", Value: hike }
                    ];

                    oEmployeeModel.setProperty("/EmployeeDetail", data);
                    oEmployeeModel.setProperty("/HikeExperience", graphData);
                    this.getView().getModel("EmployeeData").refresh();

                }.bind(this),
                error: function (xhr, status, error) {
                    console.error("❌ Error loading employee details:", error);
                    MessageToast.show("Failed to load employee details.");
                }
            });
        },

        onNavigateBack: function () {
            console.log("⬅️ Navigating back to Employee Details");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("EmployeeDetail");
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
        }
    });
});
