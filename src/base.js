const config                  	= require('@iauu/env');
const { BadRequestException } 	= require('@iauu/exceptions');
const { EventPublisher }	 	= require('@iauu/events');
const RequestEndpointService    = require('./request');

module.exports = class BaseService {
    constructor(user) {
        this.user = user;

        this.requestEndpointSvc = new RequestEndpointService();

        // Can be supressed by sched or migration scripts
        this.supressMails                   = false;
        this.supressNotifications           = false;
    }

    ensureUserIsArtist() {
        if (this.user.role.includes('artist')) { return this; }
        throw new BadRequestException('User is not contractor');
    }

    ensureUserIsContractor() {
      if (this.user.role.includes('contractor')) { return this; }
      throw new BadRequestException('User is not contractor');
    }

    supressMails() {
        this.supressMails = true;
        return this;
    }

    supressNotifications() {
        this.supressNotifications = true;
        return this;
    }

    sendMail() {
			if (this.supressMails || config.isTestEnv()) { return this; }
			
			// otherwise send mail
			return this;
    }

    async sendNotification(to, from, message, type, target) {
			// if (this.supressNotifications || config.isTestEnv()) { return this; }

			// console.log('Sending notification...');
			// try {
			// 		await this.requestNotificationEndpointSvc.post('/', {
			// 				from:     from,
			// 				to:       to, 
			// 				message:  message, 
			// 				type:     type, 
			// 				target:   target,
			// 		});
			// } catch (error) {
			// 		console.log(error);
			// }

			// return this;
    }

    async emitEvent(event, data) {
			const eventPublisher = new EventPublisher(event);
			
			try {
				await eventPublisher.publish(data);
			} catch (error) {
				// do something
				console.log(error);
			}
    }
}