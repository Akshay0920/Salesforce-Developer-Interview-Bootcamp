public class ExpiredJobScheduler
implements Schedulable{

    public void execute(
        SchedulableContext sc
    ){

        Database.executeBatch(

            new ExpiredJobBatch(),

            200

        );

    }

}
