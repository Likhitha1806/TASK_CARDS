



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("employee.controller.Home", {
        onInit: function () {
            var oModel = new JSONModel();

            $.ajax({
                url: "/odata/v4/employee/Employees",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    oModel.setData({ Employees: data.value });

                    console.log("✅ Setting mainModel with Employees:", oModel.getData()); // Debugging

                    // 🔹 Set Model globally for EmployeeDetail to access
                    this.getOwnerComponent().setModel(oModel, "mainModel");  
                }.bind(this), // Ensure 'this' is properly bound
                error: function (xhr, status, error) {
                    console.error("❌ Error fetching employee data:", error);
                }
            });

            this.getView().setModel(oModel);
        },

        onViewPress: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext();
            var employeeID = oContext.getProperty("ID");

            console.log("🔹 Navigating to EmployeeDetail with ID:", employeeID); // Debugging

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("EmployeeDetail", { employeeID: employeeID });
        }
    });
});

