
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/UIComponent",
//     "sap/ui/model/json/JSONModel"
// ], function (Controller, UIComponent, JSONModel) {
//     "use strict";

//     return Controller.extend("app.controller.EmployeeDetail", {
//         onInit: function () {
//             console.log("✅ EmployeeDetail Controller Initialized");

//             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//             oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onRouteMatched, this);
//         },
//         onPressNavigate: function () {
//             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//             oRouter.navTo("NextPage"); // Replace "nextPage" with the actual route name in your manifest.json
//         },

//         _onRouteMatched: function (oEvent) {
//             console.log("🔹 Route matched - fetching employee data");

//             // Retrieve the EmployeeID from the route parameters
//             var sEmployeeID = oEvent.getParameter("arguments").employeeID;
//             console.log("🔹 Employee ID received:", sEmployeeID); // Debugging

//             var oEmployeeModel = new JSONModel();
//             this.getView().setModel(oEmployeeModel, "EmployeeDetail");

//             // Fetch employee details via AJAX
//             $.ajax({
//                 url: "/odata/v4/employee/Employees/" + sEmployeeID, // 🟢 Fetch specific employee data
//                 type: "GET",
//                 dataType: "json",
//                 success: function (data) {
//                     oEmployeeModel.setData(data);

//                     console.log("✅ Employee details fetched successfully:", data); // Debugging
//                 }.bind(this),
//                 error: function (xhr, status, error) {
//                     console.error("❌ Error fetching employee details:", error);
//                 }
//             });
//         },
       
        
//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("app.controller.EmployeeDetail", {
        onInit: function () {
            console.log("✅ EmployeeDetail Controller Initialized");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            console.log("🔹 Route matched - fetching employee data");

            var sEmployeeID = oEvent.getParameter("arguments").employeeID;
            console.log("🔹 Employee ID received:", sEmployeeID); // Debugging

            var oEmployeeModel = new JSONModel();
            this.getView().setModel(oEmployeeModel, "EmployeeDetail");

            // Fetch employee details via AJAX
            $.ajax({
                url: "/odata/v4/employee/Employees/" + sEmployeeID, 
                type: "GET",
                dataType: "json",
                success: function (data) {
                    oEmployeeModel.setData(data);
                    console.log("✅ Employee details fetched successfully:", data);
                }.bind(this),
                error: function (xhr, status, error) {
                    console.error("❌ Error fetching employee details:", error);
                }
            });
        },

        onPressNavigate: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("NextPage", { employeeID: this._getEmployeeID() }); 
        },

        _getEmployeeID: function () {
            return this.getView().getModel("EmployeeDetail").getProperty("/ID"); 
        }
    });
});
