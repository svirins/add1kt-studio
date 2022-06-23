export default {
  supportedLanguages: [
    {id: 'ru', title: 'Russian'},
    {id: 'pl', title: 'Polish'},
  ],
  defaultLanguages: ['ru'],
  documentTypes: ['post', 'tag', 'author', 'page'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}