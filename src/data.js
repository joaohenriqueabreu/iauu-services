const { InvalidDataRequestException } = require('@iauu/exceptions');
const RequestEndpointService          = require('../services/request');

const requestEndpointSvc = new RequestEndpointService();

module.exports = class DataRequestService {
  static async getArtist(id) {
    const artist = await this.request('artists', id);
    return artist;
  };

  static async getContractor(id)  {
    const contractor = await this.request('contractors', id);
    return contractor;
  };

  static async getProposal(id) {
    const proposal = await this.request('presentations', id);
    return proposal;
  };  

  static async getPresentation(id) {
    const presentation = await this.request('presentations', id);
    return presentation;
  };  
  
  static async getBilling (id)  {
    const billing = await this.request('billings', id);
    return billing
  };
  
  static async getFeedback (id)  {
    const feedback = await this.request('feedbacks', id);
    return feedback;
  };

  static async request (api, id)  {
    console.log(`Verifying ${api} from micro-service...`);
    try {
      const response = await requestEndpointSvc.get(`/${api}/${id}`);
      console.log(`Valid ${api}...`);
      return response;
    } catch (error) {
      console.log(error);
      throw new InvalidDataRequestException(`Invalid ${api} provided`);
    }
  }    
}