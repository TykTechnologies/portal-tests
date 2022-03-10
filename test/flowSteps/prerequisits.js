import { login_page } from '../../lib/pom/Login_page';
import { invite_codes_page } from '../../lib/pom/Invite_codes_page';
import { main_page } from '../../lib/pom/Main_page';
import { registration_page } from '../../lib/pom/Registration_page';
import { admin_page } from '../../lib/pom/Admin_page';
import { providers_page } from '../../lib/pom/Providers_page';
import { org_page } from '../../lib/pom/Org_page';
import { teams_page } from '../../lib/pom/Teams_page';
import { catalogues_page } from '../../lib/pom/Catalogues_page';
import { api_products_page } from '../../lib/pom/Api_products_page';
import { general_settings_page } from '../../lib/pom/General_settings_page';
import { app_registration_page } from '../../lib/pom/App_registration_page';
import * as d from'../../config_variables';

describe('Prerequisits', () => {

  const orgsList = [d.INVITE_ORG, d.ORG_A_NAME, d.ORG_B_NAME, d.ORG_D_NAME,];
  const teamsList = [[d.INVITE_ORG, d.INVITE_TEAM],[d.ORG_A_NAME, d.TEAM_A_NAME],
    [d.ORG_A_NAME, d.TEAM_A1_NAME], [d.ORG_B_NAME, d.TEAM_B_NAME], [d.ORG_D_NAME, d.TEAM_D_NAME]];
  let devsList = {
    email: [d.DEV_EMAIL, d.DEV_A_EMAIL, d.DEV_A1_EMAIL, d.DEV_B_EMAIL, d.DEV_D_EMAIL],
    first: ["default", "teamA", "teamA1", "teamB", "teamD"],
    last:["default", "orgsA", "orgsA", "orgB", "DCR"],
    password: [d.DEV_PASS, d.DEV_PASS, d.DEV_PASS, d.DEV_PASS, d.DEV_PASS],
    inviteCode: ["", "", "", "", ""]
  };

  const inviteCodeDetails = {
    quota: "5",
    expires: "2023-09-05 00:00",
    active: true,
    team: `${d.INVITE_TEAM} | ${d.INVITE_ORG}`
  };
  const inviteCodeA = {...inviteCodeDetails, team:`${d.TEAM_A_NAME} | ${d.ORG_A_NAME}`};
  const inviteCodeA1 = {...inviteCodeDetails, team:`${d.TEAM_A1_NAME} | ${d.ORG_A_NAME}`};
  const inviteCodeB1 = {...inviteCodeDetails, team:`${d.TEAM_B_NAME} | ${d.ORG_B_NAME}`};
  const inviteCodeD = {...inviteCodeDetails, team:`${d.TEAM_D_NAME} | ${d.ORG_D_NAME}`};
  
  const providerDetails = {
    name: d.PROVIDER_NAME,
    url: d.TYK_PRO_URL,
    org_id: d.TYK_ORG_ID,
    secret: d.TYK_SECRET   
  };

  const catalogueOrgADetails = {
    name: d.CUSTOM_CATALOGUE_ORG_A_NAME,
    path: "pathA",
    visibility: "Private",
    team: "orgA All users | orgA",
    products: d.PRODUCT_ORG_A_NAME,
    plans: d.BRONZE_PLAN_NAME 
  };

  const catalogueTeamADetails = {
    name: d.CUSTOM_CATALOGUE_TEAM_A_NAME,
    path: "pathTeamA",
    visibility: "Private",
    team: "teamA | orgA",
    products: d.PRODUCT_TEAM_A_NAME,
    plans: d.GOLD_PLAN_NAME 
  };

  const catalogueTeamDDetails = {
    name: d.CUSTOM_CATALOGUE_TEAM_D_NAME,
    path: "pathTeamD",
    visibility: "Private",
    team: "teamD | orgD",
    products: d.PRODUCT_TEAM_D_NAME,
    plans: d.FREE_PLAN_NAME 
  };

  const clientDetails = {
    name:"keycloak_type1",
    description:"keycloak_type1_description",
    response_types:"code",
    grant_types:"authorization_code",
    token_endpoint:"client_secret_post",
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  orgsList.forEach( orgName => {
    it('Creating org ' + orgName, () => {
      browser.refresh();
      admin_page.ORGANIATIONS_BUTTON.click();
      org_page.ADD_BUTTON.click();
      org_page.NAME_INPUT.setValue(orgName);
      org_page.SUBMIT_NEW_BUTTON.click();
    });
  });

  teamsList.forEach( team => {
    it('Creating a Team ' + team[1], () => {
      browser.refresh();
      admin_page.TEAMS_BUTTON.click();
      teams_page.ADD_BUTTON.click();
      teams_page.NAME_INPUT.setValue(team[1]);
      teams_page.ORG_DROPDOWN.selectOption(team[0]);
      teams_page.SUBMIT_NEW_BUTTON.click();
    });
  });
  
  it('Creating invite code inviteCodeA', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeA);
    invite_codes_page.SAVE_BUTTON.click();
    browser.pause(2000);
    devsList.inviteCode[1] = invite_codes_page.getCodeFromRow(0);
    console.log(`Invite code created: ${devsList.inviteCode[1]}`);
   });

   it('Creating invite code inviteCodeA1', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeA1);
    invite_codes_page.SAVE_BUTTON.click();
    browser.pause(2000);
    devsList.inviteCode[2] = invite_codes_page.getCodeFromRow(0);
    console.log(`Invite code created: ${devsList.inviteCode[2]}`);
   });

   it('Creating invite code inviteCodeB', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeB1);
    invite_codes_page.SAVE_BUTTON.click();
    browser.pause(2000);
    devsList.inviteCode[3] = invite_codes_page.getCodeFromRow(0);
    console.log(`Invite code created: ${devsList.inviteCode[3]}`);
   });

   it('Creating invite code inviteCodeD', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeD);
    invite_codes_page.SAVE_BUTTON.click();
    browser.pause(2000);
    devsList.inviteCode[3] = invite_codes_page.getCodeFromRow(0);
    console.log(`Invite code created: ${devsList.inviteCode[4]}`);
   });

   it('creating users', () => {
    admin_page.logOut();
    login_page.open();
    for (let i =0; i <4; i++) {
      let registrationDetailsWithCode = {
        email: devsList.email[i],
        first: devsList.first[i],
        last: devsList.last[i],
        password: devsList.password[i],
        inviteCode: devsList.inviteCode[i]
      };
      main_page.REGISTER_BUTTON.click();
      registration_page.fillForm(registrationDetailsWithCode);
      registration_page.REGISTER_BUTTON.click();
      wdioExpect(main_page.REGISTRATION_SUCCESS_LABEL).toBeDisplayed();
     }
   });

it('Admin should be able to ADD provider with proper Tyk details', () => {
  login_page.open();
  login_page.login();
  admin_page.PROVIDERS_BUTTON.click();
  if ($('div*=tyk-pro').isDisplayed()) {
    providers_page.TABLE.deleteRow(0);
  }
  providers_page.ADD_BUTTON.click();
  providers_page.NAME_INPUT.waitForClickable();
  providers_page.NAME_INPUT.setValue(providerDetails.name);
  providers_page.URL_INPUT.setValue(providerDetails.url);
  providers_page.SECRET_INPUT.setValue(providerDetails.secret);
  providers_page.ORG_ID_INPUT.setValue(providerDetails.org_id);
  providers_page.SAVE_BUTTON.click();
  wdioExpect(providers_page.TABLE.$(`div*=${providerDetails.name}`)).toBeDisplayed();    
  providers_page.SYNCHRONIZE_BUTTON.click();
  providers_page.DIALOG_OK_BUTTON.click();
});

  it('edit public catalogue', () => {
    admin_page.CATALOGUES_BUTTON.click();
    catalogues_page.TABLE.clickCellWithText("Public Catalogue");
    catalogues_page.PRODUCTS_DROPDOWN.selectOption(d.PRODUCT_PUBLIC_NAME);
    catalogues_page.PLANS_DROPDOWN.selectOption(d.FREE_PLAN_NAME);
    catalogues_page.SAVE_CHANGES_BUTTON.click();
  });

  it('edit private catalogue', () => {
    admin_page.CATALOGUES_BUTTON.click();
    catalogues_page.TABLE.clickCellWithText("Private Catalogue");
    catalogues_page.PRODUCTS_DROPDOWN.selectOption(d.PRODUCT_PRIVATE_NAME);
    catalogues_page.PLANS_DROPDOWN.selectOption(d.BRONZE_PLAN_NAME);
    catalogues_page.SAVE_CHANGES_BUTTON.click();
  });

  it('add catalogue org A', () => {
    admin_page.CATALOGUES_BUTTON.click();
    catalogues_page.addCatalogue(catalogueOrgADetails);
  });

  it('add catalogue team A', () => {
    admin_page.CATALOGUES_BUTTON.click();
    catalogues_page.addCatalogue(catalogueTeamADetails);
  });

  it('add catalogue team D', () => {
    admin_page.CATALOGUES_BUTTON.click();
    catalogues_page.addCatalogue(catalogueTeamDDetails);
  });

  it("Set DCR settings", () => {
    admin_page.APP_REGISTRATION_BUTTON.click();
    app_registration_page.PROVIDER_TYPE_DROPDOWN.selectOption("keycloak");
    app_registration_page.WELL_KNOWN_URL_INPUT.setValue(d.KEYCLOAK_WELL_KNOWN_URL);
    app_registration_page.ACCESS_TOKEN_INPUT.setValue(d.KEYCLOAK_TOKEN);
    try{
      app_registration_page.SSL_SKIP_VERIFY_CHECKBOX.getAttribute("checked"); //if not checked -> error will be thrown
    } catch {
      app_registration_page.SSL_SKIP_VERIFY_CHECKBOX.click();
    }
      if (app_registration_page.SSL_SKIP_VERIFY_CHECKBOX.getAttribute("checked") !== "true") {
        app_registration_page.SSL_SKIP_VERIFY_CHECKBOX.click();
      };

    app_registration_page.addClientType(clientDetails);
    app_registration_page.SAVE_CHANGES_BUTTON.click();
  });

  it('Enable DCR product', () => {
    admin_page.API_PRODUCTS_BUTTON.click();
    api_products_page.TABLE.clickCellWithText(d.PRODUCT_TEAM_D_NAME);
     if (api_products_page.ENABLE_DCR_CHECKBOX.getAttribute("checked") !== "true") {
      api_products_page.ENABLE_DCR_CHECKBOX.click();
    };
    api_products_page.SCOPES_INPUT.setValue("test_scope");
    api_products_page.CLIENTS_TYPES_DROPDOWN.clearSlection();
    api_products_page.CLIENTS_TYPES_DROPDOWN.selectOption(clientDetails.name);
    api_products_page.SAVE_CHANGES_BUTTON.click();
  });

  it("Add email settings", function () {
    admin_page.GENERAL_BUTTON.click();
    general_settings_page.EMAIL_DEFAULT_FROM_ADDRESS_INPUT.setValue(d.EMAIL_DEFAULT_FROM_ADDRESS);
    general_settings_page.SAVE_CHANGES_BUTTON.click();
  });

});