import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SuccessComponent } from "./success/success.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "success", component: SuccessComponent, pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
