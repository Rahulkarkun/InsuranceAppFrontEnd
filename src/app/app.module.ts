import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { InsurancePlansComponent } from './insurance-plans/insurance-plans.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProtectionPlanComponent } from './protection-plan/protection-plan.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddagentComponent } from './addagent/addagent.component';
import { JwtInterceptor } from './jwt.interceptor';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimResolveComponent } from './claim-resolve/claim-resolve.component';
import { AgentComponent } from './agent/agent.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { SchemedetailsListComponent } from './schemedetails-list/schemedetails-list.component';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { InsurancePolicyListComponent } from './insurance-policy-list/insurance-policy-list.component';
import { AdminComponent } from './admin/admin.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddInsurancePlanComponent } from './add-insurance-plan/add-insurance-plan.component';
import { InsurancePlanListComponent } from './insurance-plan-list/insurance-plan-list.component';
import { UpdateInsurancePlanComponent } from './update-insurance-plan/update-insurance-plan.component';
import { AddInsuranceSchemeComponent } from './add-insurance-scheme/add-insurance-scheme.component';
import { InsuranceSchemeListComponent } from './insurance-scheme-list/insurance-scheme-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { AgentNavbarComponent } from './agent-navbar/agent-navbar.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UpdateClaimComponent } from './update-claim/update-claim.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AddSchemeDetailsComponent } from './add-scheme-details/add-scheme-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { UpdateSchemeComponent } from './update-scheme/update-scheme.component';
import { UpdateSchemeDetailsComponent } from './update-scheme-details/update-scheme-details.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { AdminChangeUsernameComponent } from './admin-change-username/admin-change-username.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerChangePasswordComponent } from './customer-change-password/customer-change-password.component';
import { CustomerChangeUsernameComponent } from './customer-change-username/customer-change-username.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddagentComponent,
    AboutComponent,
    LoginComponent,
    InsurancePlansComponent,
    ContactUsComponent,
    AddCustomerComponent,
    FooterComponent,
    RegisterComponent,
    ProtectionPlanComponent,
    WeatherInfoComponent,
    AgentListComponent,
    CustomerListComponent,
    ClaimComponent,
    ClaimListComponent,
    ClaimResolveComponent,
    AgentComponent,
    ViewPaymentsComponent,
    SchemedetailsListComponent,
    AddInsurancePolicyComponent,
    InsurancePolicyListComponent,
    AdminComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    AddInsurancePlanComponent,
    InsurancePlanListComponent,
    UpdateInsurancePlanComponent,
    AddInsuranceSchemeComponent,
    InsuranceSchemeListComponent,
    CustomerComponent,
    CustomerNavbarComponent,
    AgentNavbarComponent,
    AgentLoginComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    UpdateClaimComponent,
    UpdateCustomerComponent,
    AddSchemeDetailsComponent,
    UpdateEmployeeComponent,
    UpdateAgentComponent,
    UpdateSchemeComponent,
    UpdateSchemeDetailsComponent,
    AdminProfileComponent,
    EmployeeNavbarComponent,
    EmployeeDashboardComponent,
    AdminChangePasswordComponent,
    AdminChangeUsernameComponent,
    CustomerDashboardComponent,
    CustomerProfileComponent,
    CustomerChangePasswordComponent,
    CustomerChangeUsernameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
