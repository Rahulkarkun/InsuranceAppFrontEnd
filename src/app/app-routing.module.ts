import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { InsurancePlansComponent } from './insurance-plans/insurance-plans.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { ProtectionPlanComponent } from './protection-plan/protection-plan.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { AddagentComponent } from './addagent/addagent.component';
import { EmployeeComponent } from './employee/employee.component';
// import { ResolveClaimComponent } from './resolve-claim/resolve-claim.component';
import { DocumentverificationComponent } from './documentverification/documentverification.component';
//import { UpdateDocumentComponent } from './update-document/update-document.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimResolveComponent } from './claim-resolve/claim-resolve.component';
import { AgentComponent } from './agent/agent.component';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { SchemedetailsListComponent } from './schemedetails-list/schemedetails-list.component';
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
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SchemeDetailsComponent } from './scheme-details/scheme-details.component';
import { EmployeeChangePasswordComponent } from './employee-change-password/employee-change-password.component';
import { EmployeeChangeUsernameComponent } from './employee-change-username/employee-change-username.component';
import { DocumentVerificationListComponent } from './document-verification-list/document-verification-list.component';
import { UpdateInsurancePolicyComponent } from './update-insurance-policy/update-insurance-policy.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { AgentChangePasswordComponent } from './agent-change-password/agent-change-password.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AgentCustomerListComponent } from './agent-customer-list/agent-customer-list.component';
import { AddQueryComponent } from './add-query/add-query.component';
import { ViewQueryListComponent } from './view-query-list/view-query-list.component';
import { UpdateQueryComponent } from './update-query/update-query.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { CommissionListComponent } from './commission-list/commission-list.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { CommissionWithdrawalListComponent } from './commission-withdrawal-list/commission-withdrawal-list.component';
import { QueryFilterCustomerComponent } from './query-filter-customer/query-filter-customer.component';
import { InsuranceAccountFilterComponent } from './insurance-account-filter/insurance-account-filter.component';
import { CustomerClaimListFilterComponent } from './customer-claim-list-filter/customer-claim-list-filter.component';
import { AddClaimComponent } from './add-claim/add-claim.component';
import { SdInterestCalculatorComponent } from './sd-interest-calculator/sd-interest-calculator.component';
import { InsuranceAccountComponent } from './insurance-account/insurance-account.component';
import { CommissionWithdrawalComponent } from './commission-withdrawal/commission-withdrawal.component';
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'insurance-plans', component: InsurancePlansComponent },
  { path: 'insurance-plans/protection-plan', component: ProtectionPlanComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {path: 'add-agent', component: AddagentComponent},
  {path: 'employee', component: EmployeeComponent},
  // {path: 'claims', component: ResolveClaimComponent},
  {path: 'document-verification', component: DocumentverificationComponent },
  //{ path: 'update-document/:id', component: UpdateDocumentComponent },
  { path: 'agent-list', component: AgentListComponent },
  {path: 'add-customer', component: AddCustomerComponent},
  { path: 'customer-list', component: CustomerListComponent },
  {path:'claim',component:ClaimComponent},
  {path:'claim-list',component:ClaimListComponent},
  {path:'claim-resolve',component:ClaimResolveComponent},
  {path:'agent',component:AgentComponent},
  {path:'view-payments',component:ViewPaymentsComponent},
  {path:'schemedetails-list',component:SchemedetailsListComponent},
  {path:'add-insurance-policy',component:AddInsurancePolicyComponent},
  {path:'insurance-policy-list',component:InsurancePolicyListComponent},
  {path:'admin',component:AdminComponent},
  {path:'add-employee',component:AddEmployeeComponent},
  {path:'employee-list',component:EmployeeListComponent},
  {path:'add-insurance-plan',component:AddInsurancePlanComponent},
  {path:'insurance-plan-list',component:InsurancePlanListComponent},
  {path:'update-insurance-plan/:id',component:UpdateInsurancePlanComponent},
  {path:'add-insurance-scheme',component:AddInsuranceSchemeComponent},
  {path:'insurance-scheme-list',component:InsuranceSchemeListComponent},
  {path:'customer',component:CustomerComponent},
  {path:'customer-navbar',component:CustomerNavbarComponent},
  {path:'agent-navbar',component:AgentNavbarComponent},
  {path:'agent-login',component:AgentLoginComponent},
  {path:'admin-navbar',component:AdminNavbarComponent}, 
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'update-claim/:id',component:UpdateClaimComponent},
  {path:'update-customer/:id',component:UpdateCustomerComponent},
  {path:'add-scheme-details',component:AddSchemeDetailsComponent},
  {path:'update-employee/:id',component:UpdateEmployeeComponent},
  {path:'update-agent/:id',component:UpdateAgentComponent},
  {path:'update-scheme/:id',component:UpdateSchemeComponent},
  {path:'update-scheme-details/:id',component:UpdateSchemeDetailsComponent},
  // {path:'update-scheme-details/:id',component:UpdateSchemeDetailsComponent},
  {path:'admin-profile/:id',component:AdminProfileComponent},
  {path:'employee-navbar',component:EmployeeNavbarComponent},
  {path:'employee-dashboard',component:EmployeeDashboardComponent},
  {path:'admin-change-password',component: AdminChangePasswordComponent},
  {path:'admin-change-username',component: AdminChangeUsernameComponent},
  {path:'employee-profile/:id',component: EmployeeProfileComponent},
  {path:'customer-dashboard',component:CustomerDashboardComponent},
  {path:'customer-profile',component:CustomerProfileComponent},
  {path:'customer-change-password',component: CustomerChangePasswordComponent},
  {path:'customer-change-username',component: CustomerChangeUsernameComponent},
  {path:'scheme-details',component: SchemeDetailsComponent},
  {path:'employee-change-password',component: EmployeeChangePasswordComponent},
  {path:'employee-change-username',component: EmployeeChangeUsernameComponent},
  {path:'document-verification-list',component: DocumentVerificationListComponent},
  {path:'update-insurance-policy/:id',component: UpdateInsurancePolicyComponent},
  {path:'agent-profile/:id',component:AgentProfileComponent},
  {path:'agent-change-password',component:AgentChangePasswordComponent},
  {path:'agent-dashboard',component:AgentDashboardComponent},
  {path:'agent-customer-list',component:AgentCustomerListComponent},
  {path:'add-query',component:AddQueryComponent},
  {path:'view-query-list',component:ViewQueryListComponent},
  {path:'update-query/:id',component:UpdateQueryComponent},
  {path:'view-document/:id',component:DocumentViewerComponent},
  {path:'upload-document',component:UploadDocumentComponent},
  {path:'commission-list',component:CommissionListComponent},
  {path:'upload-document',component:UploadDocumentComponent},
  { path: 'commission-withdrawal-list', component: CommissionWithdrawalListComponent },
  {path:'query-filter-customer',component:QueryFilterCustomerComponent},
  {path:'insurance-account-filter',component:InsuranceAccountFilterComponent},
  {path:'customer-claim-list-filter',component:CustomerClaimListFilterComponent},
  {path:'add-claim',component:AddClaimComponent},
  {path:'insurance-plan',component:InsurancePlansComponent},
  {path:'sd-interest-calculator',component:SdInterestCalculatorComponent},
  {path:'insurance-account',component:InsuranceAccountComponent},
  {path:'commission-withdrawal',component:CommissionWithdrawalComponent},
  {path:'customer-payment',component:CustomerPaymentComponent},
  {
    path:"weather",
    component:WeatherInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }