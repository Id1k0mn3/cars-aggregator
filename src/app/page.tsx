import { isApiClientError } from "@/src/shared/api";

import { HomePage } from "../views/home";
import { getHomePage } from "../views/home/api/home-page-api";
import {
  createEmptyHomePageViewModel,
  mapHomePageDtoToViewModel,
} from "../views/home/model/home-page-mappers";

const getHomePageErrorMessage = (error: unknown) => {
  if (isApiClientError(error)) {
    return error.payload?.message ?? error.message;
  }

  return "Failed to load home page data.";
};

export default async function Page() {
  let homePage = createEmptyHomePageViewModel();
  let errorMessage: string | null = null;
  try {
    const homePageDto = await getHomePage();
    homePage = mapHomePageDtoToViewModel(homePageDto);
  } catch (error) {
    console.log(error);
    errorMessage = getHomePageErrorMessage(error);
  }

  return <HomePage errorMessage={errorMessage} homePage={homePage} />;
}
