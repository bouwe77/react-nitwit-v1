export function handleError(error) {
  console.log(error, error.request, error.response, error.config);
  throw error;
}
