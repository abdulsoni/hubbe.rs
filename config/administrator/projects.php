<?php
use Fundator\Expert;
use Fundator\Events\ProjectApproved;
use Fundator\Events\ProjectBidSuperExpert;
use Fundator\Events\ProjectExpertiseApproved;
use Fundator\Events\ProjectExpertsApproved;
use Fundator\Events\ProjectBudgetApproved;
use Fundator\Events\ProjectFinanceApproved;
use Fundator\Events\ProjectInvestorsApproved;
/**
 * Directors model config
 */
return array(
    'title' => 'Projects',
    'single' => 'Project',
    'model' => 'Fundator\Project',
    /**
     * The display columns
     */
    'columns' => array(
        'id',
        'creator' => array(
            'title' => 'Creator',
            'relationship' => 'creator.user',
            'select' => 'name',
        ),
        'name' => array(
            'title' => 'Name',
        ),
        'state' => array(
            'title' => 'State',
        ),
        'draft' => array(
            'title' => 'Is Draft ?',
        ),
        'display' => array(
            'title' => 'Should Display ?',
        )
    ),
    /**
     * The width of the model's edit form
     *
     * @type int
     */
    'form_width' => 500,
    /**
     * The editable fields
     */
    'edit_fields' => array(
        'id',
        'creator' => array(
            'type' => 'relationship',
            'title' => 'Creator',
            'name_field' => 'name'
        ),
        'thumbnail' => array(
            'title' => 'Image (350 x 370)',
            'type' => 'image',
            'naming' => 'random',
            'location' => public_path() . '/',
            'size_limit' => 2,
            'sizes' => array(
                array(350, 370, 'crop', public_path() . '/projects/cropped/', 100),
            )
        ),
        'name' => array(
            'title' => 'Name',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'wysiwyg'
        ),
        'start_time' => array(
            'title' => 'Start Date',
            'type' => 'date'
        ),
        'duration' => array(
            'title' => 'Duration',
            'type' => 'number'
        ),
        'draft' => array(
            'type' => 'bool',
            'title' => 'Is Draft ?',
        ),
        'display' => array(
            'type' => 'bool',
            'title' => 'Should Display ?',
        )
    ),
    /**
     * Project Actions
     */
    'actions' => array(
        // Send Notifications to judges
        'approve_project' => array(
            'title' => 'Approve Project',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving the project',
            ),
            'permission' => function($model)
            {
                return $model->state == 0.9;
            },
            'action' => function($model)
            {
                // Notify the judges
                Log::info('Approved');
                try{
                    $model->state = 1;
                    $saveResult = $model->save();
                    $superExpert = Expert::where('super_expert', 1)->first();
                    Event::fire(new ProjectApproved($model));
                    Event::fire(new ProjectBidSuperExpert($model, $superExpert));
                    return $saveResult;
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        ),
        'approve_expertise' => array(
            'title' => 'Approve Project Expertise',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving project expertise',
            ),
            'permission' => function($model)
            {
                return $model->state == 2.9;
            },
            'action' => function($model)
            {
                Log::info('Project Expertise Approved');
                try{
                    $model->state = 3;
                    Event::fire(new ProjectExpertiseApproved($model));
                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        ),
        'approve_experts' => array(
            'title' => 'Approve Project Experts',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving project experts',
            ),
            'permission' => function($model)
            {
                return $model->state == 3.9;
            },
            'action' => function($model)
            {
                Log::info('Project Experts Approved');
                try{
                    $model->state = 4;
                    Event::fire(new ProjectExpertsApproved($model));
                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        ),
        'approve_budget' => array(
            'title' => 'Approve Project Budget',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving project budget',
            ),
            'permission' => function($model)
            {
                return $model->state == 4;
            },
            'action' => function($model)
            {
                Log::info('Project Budget Approved');
                try{
                    $model->state = 4.1;
                    Event::fire(new ProjectBudgetApproved($model));
                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        ),
        'approve_finances' => array(
            'title' => 'Approve Project Finance',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving project finance',
            ),
            'permission' => function($model)
            {
                return $model->state == 4.9;
            },
            'action' => function($model)
            {
                Log::info('Project Finance Approved');
                try{
                    $model->state = 5;
                    Event::fire(new ProjectFinanceApproved($model));
                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        ),
        'approve_investors' => array(
            'title' => 'Approve Investors',
            'messages' => array(
                'active' => 'Approving ...',
                'success' => 'Approved',
                'error' => 'There was an error while approving project investors',
            ),
            'permission' => function($model)
            {
                return $model->state == 5.9;
            },
            'action' => function($model)
            {
                Log::info('Project Invetors Approved');
                try{
                    $model->state = 6;
                    $model->draft = 0;
                    $model->display = 1;
                    Event::fire(new ProjectInvetorsApproved($model));
                    if ($model->save()) {
                        return true;
                    }
                }catch (Exception $e){
                    Log::error($e);
                }
                return false;
            }
        )
    ),
);