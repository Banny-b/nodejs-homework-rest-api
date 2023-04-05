const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

async function changeContactsPath(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeID = contacts.findIndex((contact) => contact.id === contactId);
  if (removeID === -1) {
    return null;
  }
  const [removeContacts] = contacts.splice(removeID, 1);
  changeContactsPath(contacts);
    return removeContacts;
};

async function addContact(body) {
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  changeContactsPath(contacts);
    return newContact;
};

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const updateID = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (updateID === -1) {
    return null;
  };
  contacts[updateID] = {...contacts[updateID],...body };
  await changeContactsPath(contacts);
    return contacts[updateID];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};