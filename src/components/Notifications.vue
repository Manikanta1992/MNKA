<template>
	<div id="main-wrapper" class="m-t-20">
 		<div class="card">
		    <div class="card-body">
		        <h4 class="card-title text-center">Notifications</h4>
		        <form class="form-horizontal " @submit.prevent="handleSubmit">
                <div class="form-group">
                	<div class="row">
                		<div class="col-md-3">
                		 <h4 for="notifications.title" class="control-label">Title: <span class="text-danger">*</span></h4>
	                	</div>
	                	<div class="col-md-9">
	                    <input type="text" class="form-control"  placeholder="title" v-model.trim="notifications.title" name="title" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('title') }" autocomplete="off" />
                      <div v-if="submitted && errors.has('title')" class="invalid-feedback">{{ errors.first('title') }}</div>
	                	</div>
	                </div>
                </div>
                <div class="form-group">
                	<div class="row">
                		<div class="col-md-3">
                		 <h4 for="notifications.body" class="control-label">Body: <span class="text-danger">*</span></h4>
	                	</div>
	                	<div class="col-md-9">
	                    <textarea class="form-control" rows='5' placeholder="body" v-model.trim="notifications.body" name="body" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('body') }" autocomplete="off" ></textarea>
	                    <div v-if="submitted && errors.has('body')" class="invalid-feedback">{{ errors.first('body') }}</div>
	                	</div>
	                </div>
	              </div>
	              <div class="form-group">
                	<div class="row">
                		<div class="col-md-3">
                		    <h4 for="notifications.notification_type" class="control-label">Notification Type: <span class="text-danger">*</span></h4>
	                	</div>
	                	<div class="col-md-3">
                      <select  v-validate="'required|included:.Activities.SplashScreenActivity,.Activities.NotificationActivity'" v-model.trim="notifications.notification_type" name="Notification Type" class="form-control custom-select" :class="{ 'is-invalid': submitted && errors.has('Notification Type') }">
                          <option value="" disabled hidden notifications.notification_type>---Select---</option>
                          <option value=".Activities.SplashScreenActivity">General Notification</option>
                          <option value=".Activities.NotificationActivity">Update Notification</option>
                      </select>
                      <div v-if="submitted && errors.has('Notification Type')" class="invalid-feedback">{{ errors.first('Notification Type') }}</div>
	                	</div>
	                </div>
	              </div>
                <div class="form-group">
	              	<div class="row ">
	              		<div class=" col-md-12 text-right">
	              			<button type="button" @click='resetForm'class="btn btn-danger" >Clear</button>
                      <button type="submit" class="btn btn-primary">Send Notification</button>
	              		</div>
	              	</div>
	              </div>  
            </form>
		    </div>
		</div>
		<div class="card">
		    <div class="card-body">
		        <h4 class="card-title text-center">Bulk SMS</h4>
		        <form class="form-horizontal">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3">
                     <h4 for="reminder.Msg" class="control-label">Message: <span class="text-danger">*</span></h4>
                    </div>
                    <div class="col-md-9">
                      <textarea class="form-control" rows="5" placeholder="message" v-model.trim="reminder.Msg" ></textarea>
                      <h5 v-if="submitted1" class="text-danger">the message field is required.</h5>
                    </div>
                  </div>
                </div>
                <div class="form-group form-material">
                	<div class="row  m-t-20">
                		<div class="col-md-3">
                		  <h4 for="reminder.scheduleTime" class="control-label">Schedule Time: </h4>
	                	</div>
	                	<div class="col-md-9">
                      <datetime type="datetime" class="form-control" v-model.trim="reminder.scheduleTime" placeholder="schedule time" use12-hour auto></datetime>
	                	</div>
	                </div>
                </div>
             
	              <div class="form-group">
	              	<div class="row ">
	              		<div class=" col-md-12 text-right">
	              			<button type="button" @click='resetReminder'class="btn btn-danger" >Clear</button>
                      <button type="button" @click='bulkSmsReminder()' class="btn btn-primary">Send SMS</button>
	              		</div>
	              	</div>
	              </div>  
            </form>
		    </div>
    </div>    
	</div>

</template>
<script>
	import moment from 'moment'
  import { Datetime } from 'vue-datetime';
  import { authHeader } from '../_helpers';
  import  config from '../../config';
export default {
    name: 'Notifications',
    components: {
      datetime: Datetime
    },
    data () {
      return {
          
          notifications: {
          	title:'',
          	body:'',
          	notification_type:'',

          },
          reminder: {
            scheduleTime:'',Msg:''
          },          
          submitted: false,
          submitted1: false,
      }
    },
    methods: {
        DateFormat: function(value){
           if (value) {
              return moment(String(value)).format('YYYY-MM-DD HH:MM:SS')
            }
        },
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                 if (confirm('Are you want to sure Send the Notification')){
	                 	const requestOptions = {
	                  	headers: { 'Content-Type': 'application/json',
	                  	 'Authorization': "key=AAAA4dZW4PI:APA91bGEAhNH4r1b0l2b__jYNTzuFUe5RU7l_f-Za8CF_zDfx3mTX37rF5rqnx6n2BUadhJs7XpXCaoMilAfGrJsKIlOeVW17iaTsjGuBXwy_6y9GsWSboQdKjLZtSoaNXpNQk47XsERD2jvaJ1_XfVF4INNwgsZfA"}
						         };
						        this.$http.post(`https://fcm.googleapis.com/fcm/send`, {
						        	"to":"/topics/Update",
						        	"notification": {
						        		"title":this.notifications.title,
						        		"body":this.notifications.body,
						        		"click_action":this.notifications.notification_type
						        	},
						        	"data":{
						        		"title":this.notifications.title,
						        		"body":this.notifications.body,
						        		"click_action":this.notifications.notification_type
						        	},
						        	"priority":10}, requestOptions).then(response => {
						           if (response.ok){
                          alert('Notification Sent Successfully..! ')
                          this.submitted = false
                          this.resetForm()
						           }
						        }, error => {
						        	console.log(error);
						        });
                 }
                }
            });
        },
        resetForm: function() {
          this.notifications.title = ''
          this.notifications.body = ''
          this.notifications.notification_type = ''  
        },
        bulkSmsReminder: function(){
           var reminder = this.reminder
            if (reminder.Msg == ""){
                this.submitted1 = true
                
            }else{
               this.submitted1 = false
                 if (confirm('Are you want to sure Send the Bulk SMS')){
                    if (reminder.scheduleTime != ''){
                      reminder.scheduleTime = this.DateFormat(reminder.scheduleTime)
                    }
                    const requestOptions = {
                      headers: authHeader()
                    };
                   this.$http.post(`${config.apiUrl}/api/v1/game_reminder`,{reminder_schedule: reminder.scheduleTime,reminder_msg:reminder.Msg },requestOptions).then(response => {
                       if (response.body.status){
                          alert(response.body.message)
                          this.resetReminder()
                       }else{
                         this.resetReminder()
                         alert(response.body.error)
                         
                       }
                    }, error => {
                      console.log(error);
                    });
                }
            } 
          
        },
        resetReminder: function(){
           this.reminder.Msg          = ''
           this.reminder.scheduleTime = ''
        }
    }
};
</script>