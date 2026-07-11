class AddNameToSolidQueueProcesses < ActiveRecord::Migration[8.0]
  def change
    add_column :solid_queue_processes, :name, :string, null: false, default: ""
    change_column_default :solid_queue_processes, :name, from: "", to: nil
    remove_index :solid_queue_processes, [ :supervisor_id, :pid ], unique: true, if_exists: true
    add_index :solid_queue_processes, [ :name, :supervisor_id ], unique: true
  end
end
