// Sanity v3 desk structure: the desk tool passes Structure Builder (S) in
// the function parameter; no import needed.
export default (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Locations").child(S.documentTypeList("location")),
      S.listItem().title("Service Types").child(S.documentTypeList("serviceType")),
      S.listItem().title("Categories").child(
        S.documentTypeList("category").title("Categories by Location & Type")
      ),
      S.listItem().title("Services").child(
        S.documentTypeList("service").title("Services")   
      ),
    ]);

// Hints:
// - Use initial value templates to pre-fill location/type when creating services under a category context.
// - Use document actions (publish, duplicate) to streamline workflows.