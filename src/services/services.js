import axios from 'axios';
import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable()
};

export function getAll(url, data) {
  return axios.post(url, data).then(res => res.data);
}
export function getAllnote(url) {
  return axios.get(url).then(res => res.data)
}
export function archive(url, data) {
  return axios.put(url, data).then(res => res.data)
}
export function updateNote(url, data) {
  return axios.put(url, data).then(res => res.data)
}
export function addNote(url, data) {
  return axios.post(url, data).then(res => res.data)
}
export function isTrash(url, data) {
  return axios.put(url, data).then(res => res.data)
}
export function color(url, data) {
  return axios.put(url, data).then(res => res.data)
}


