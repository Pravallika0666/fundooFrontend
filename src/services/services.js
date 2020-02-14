import axios from 'axios';
import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable()
};
export default {
  getAll(url, data) {
    return axios.post(url, data).then(res => res.data);
  },
  getAllnote(url) {
    return axios.get(url).then(res => res.data)
  },
  archive(url, data) {
    return axios.put(url, data).then(res => res.data)
  },
  updateNote(url, data) {
    return axios.put(url, data).then(res => res.data)
  },
  addNote(url, data) {
    return axios.post(url, data).then(res => res.data)
  },
  isTrash(url, data) {
    return axios.put(url, data).then(res => res.data)
  },
  updateColor(url, data) {
    return axios.put(url, data).then(res => res.data)
  },
  addReminder(url, data) {
    return axios.post(url, data).then(res => res.data)
  },
  labelCreate(url,data){
    return axios.post(url,data).then(res=>res.data)
  },
  imageUpload(url,data){
    return axios.post(url,data).then(res=>res.data)
  },
  getLabels(url,data){
    return axios.get(url,data).then(res=>res.data)
  }
}



